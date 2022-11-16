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
		const databases = await this.notion.blocks.children
			.list({
				block_id: this.pageRoot
			})
			// @ts-ignore
			.then(({ results }) => results.filter((f) => f.type === 'child_database'));
		return databases;
	}

	async retreiveDatabase(databaseId: string): Promise<GetDatabaseResponse> {
		const database = await this.notion.databases.retrieve({
			database_id: databaseId
		});
		return database;
	}

	async getDatabase(databaseId: string): Promise<ServerGetDatabaseResponse> {
		const entries = await this.notion.databases.query({
			database_id: databaseId
		});

		const database = await this.retreiveDatabase(databaseId);

		return {
			results: entries.results,
			parent: [
				{
					id: database.id,
					name: database?.title?.[0]?.plain_text || 'Unknown',
					type: 'db'
				}
			]
		};
	}

	async getPage(pageId: string): Promise<ServerGetPageResponse> {
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
	}

	async getPageContent(pageId: string): Promise<ServerGetPageContentResponse> {
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
	}
}

const notion = new NotionClient(SECRET_NOTION_KEY, SECRET_ROOT_PAGE);

export default notion;
