import { Client } from '@notionhq/client';
import type {
	AppendBlockChildrenResponse,
	BlockObjectResponse,
	GetDatabaseResponse,
	GetPageResponse,
	ListBlockChildrenResponse,
	PageObjectResponse,
	PartialBlockObjectResponse,
	PartialPageObjectResponse,
	QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
// import Keyv from 'keyv';

const SECRET_NOTION_KEY = process.env.SECRET_NOTION_KEY!
const SECRET_ROOT_PAGE = process.env.SECRET_ROOT_PAGE!

const TTL_MINS = process.env.NODE_ENV === "development" ? 0.01 : 60;
const TTL_MS = TTL_MINS * 60 * 1000;
// const endpointCache = new Keyv({ namespace: 'notion-cache', ttl: TTL_MS });

export type ParentBreadcrumbSpec = {
	id: string;
	name: string;
	type: 'db' | 'page' | null;
};

export type ServerGetDatabaseResponse = {
	results: QueryDatabaseResponse['results'];
	parent: Array<ParentBreadcrumbSpec>;
};

export type ServerGetPageResponse = {
	page: GetPageResponse;
	parent: Array<ParentBreadcrumbSpec>;
};

export type ServerGetPageContentResponse = ServerGetPageResponse & {
	content: ListBlockChildrenResponse;
};

const withCache = async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
	// const cached = await endpointCache.get(key);
	// if (cached) {
	// 	console.log(key, ' is cached');
	// 	return cached;
	// }
	const result = await fn();
	// await endpointCache.set(key, result);
	return result;
};

class NotionClient {
	notion: Client;
	pageRoot: string;

	constructor(SECRET_NOTION_KEY: string, SECRET_ROOT_PAGE: string) {
		this.notion = new Client({ auth: SECRET_NOTION_KEY });
		this.pageRoot = SECRET_ROOT_PAGE;
	}
	async getChildDatabases(): Promise<BlockObjectResponse[]> {
		const fetchdb = async () => {
			const databases = await this.notion.blocks.children
				.list({
					block_id: this.pageRoot
				})
				// @ts-ignore
				.then(({ results }) => results.filter((f) => f.type === 'child_database'));
			return databases;
		};
		return withCache(this.pageRoot, fetchdb) as Promise<BlockObjectResponse[]>;
	}

	async retreiveDatabase(databaseId: string): Promise<GetDatabaseResponse> {
		const database = await this.notion.databases.retrieve({
			database_id: databaseId
		});
		return database;
	}

	async getDatabase(databaseId: string): Promise<ServerGetDatabaseResponse> {
		const cacheString = `db-${databaseId}`;
		const fetchDb = async () => {
			const entries = await this.notion.databases.query({
				database_id: databaseId
			});

			const database = await this.retreiveDatabase(databaseId);
			const data: ServerGetDatabaseResponse = {
				results: entries.results,
				parent: [
					{
						id: database.id,
						// @ts-ignore
						name: database?.title?.[0]?.plain_text || 'Unknown',
						type: 'db'
					}
				]
			};
			return data;
		};
		return withCache(cacheString, fetchDb);
	}

	async getPage(pageId: string): Promise<ServerGetPageResponse> {
		const cacheString = `page-${pageId}`;
		const fetchPage = async () => {
			const page = await this.notion.pages.retrieve({
				page_id: pageId
			});

			let parent: ParentBreadcrumbSpec[] = [
				{
					id: page.id,
					// @ts-ignore
					name: page?.properties?.Name?.title?.[0]?.plain_text || 'Unknown',
					type: 'page'
				}
			];
			
			const database =
			// @ts-ignore
			page?.parent?.type === 'database_id'
			// @ts-ignore
			? await this.retreiveDatabase(page.parent.database_id)
			: undefined;
			
			if (database) {
				parent.unshift({
					id: database.id,
					// @ts-ignore
					name: database?.title?.[0]?.plain_text || 'Unknown',
					type: 'db'
				});
			}

			return {
				page,
				parent
			};
		};
		return withCache(cacheString, fetchPage);
	}

	async getPageContent(pageId: string): Promise<ServerGetPageContentResponse> {
		const fetchBlocks = async () => {
			const [content, pageResponse] = await Promise.all([
				this.notion.blocks.children.list({
					block_id: pageId
				}),
				this.getPage(pageId)
			]);
			return {
				content,
				...pageResponse
			};
		};
		return withCache(`block-content-${pageId}`, fetchBlocks);
	}

	async getFullIndex(): Promise<(PageObjectResponse | PartialPageObjectResponse)[]> {
		const databases = await this.getChildDatabases();
		const data = await Promise.all(
			databases.map((db) => {
				return this.getDatabase(db.id);
			})
		);
		const merged = data.map(d => d.results).flat()
			.sort((a,b) => a?.properties?.Name?.title?.[0]?.text?.content?.localeCompare(b?.properties?.Name?.title?.[0]?.text?.content));
		return merged
	} 
}

const notion = new NotionClient(SECRET_NOTION_KEY, SECRET_ROOT_PAGE);

export default notion;