import { Client } from '@notionhq/client';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

class NotionClient {
	notion: Client;
	pageRoot: string;

	constructor(SECRET_NOTION_KEY: string, SECRET_ROOT_PAGE: string) {
		this.notion = new Client({ auth: SECRET_NOTION_KEY });
		this.pageRoot = SECRET_ROOT_PAGE;
	}

	async getChildDatabases() {
		const databases = await this.notion.blocks.children
			.list({
				block_id: this.pageRoot
			})
            // @ts-ignore
			.then(({ results }) => results.filter((f) => f.type === 'child_database'));
		return databases;
	}

	async getDatabase(databaseId: string): Promise<QueryDatabaseResponse> {
		const database = await this.notion.databases.query({
			database_id: databaseId
		});
		return database;
	}
}

export default NotionClient;
