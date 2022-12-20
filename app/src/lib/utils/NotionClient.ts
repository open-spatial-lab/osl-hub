import { Client } from '@notionhq/client';
import type {
	AppendBlockChildrenResponse,
	BlockObjectResponse,
	GetDatabaseResponse,
	GetPageResponse,
	ListBlockChildrenResponse,
	PartialBlockObjectResponse,
	QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import { SECRET_NOTION_KEY, SECRET_ROOT_PAGE } from '$env/static/private';
import { withCache } from '$lib/utils/withCache';
// import Keyv from 'keyv';
// const TTL_MINS = import.meta.env.MODE === "development" ? 0.01 : 60;
// const TTL_MS = TTL_MINS * 60 * 1000;
// const endpointCache = new Keyv({ namespace: 'notion-cache', ttl: TTL_MS });

export type ParentBreadcrumbSpec = {
	id: string;
	name: string;
	type: 'db' | 'page';
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
class NotionClient {
	notion: Client;
	pageRoot: string;

	constructor(SECRET_NOTION_KEY: string, SECRET_ROOT_PAGE: string) {
		this.notion = new Client({ auth: SECRET_NOTION_KEY });
		this.pageRoot = SECRET_ROOT_PAGE;
	}
	async getChildDatabases(): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> {
		const fetchdb = async () => {
			const databases = await this.notion.blocks.children
				.list({
					block_id: this.pageRoot
				})
				// @ts-ignore
				.then(({ results }) => results.filter((f) => f.type === 'child_database'));
			return databases;
		};
		return withCache(this.pageRoot, fetchdb);
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
					name: page?.properties?.Name?.title?.[0]?.plain_text || 'Unknown',
					type: 'page'
				}
			];

			const database =
				page?.parent?.type === 'database_id'
					? await this.retreiveDatabase(page.parent.database_id)
					: undefined;

			if (database) {
				parent.unshift({
					id: database.id,
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
}

const notion = new NotionClient(SECRET_NOTION_KEY, SECRET_ROOT_PAGE);

export default notion;
