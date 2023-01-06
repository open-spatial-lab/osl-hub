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
import { SECRET_NOTION_KEY, SECRET_ROOT_PAGE } from '$env/static/private';
import { withCache } from '$lib/utils/withCache';
import type { Link, Node } from '$components/KnowledgeGraph/types';
// import Keyv from 'keyv';
// const TTL_MINS = import.meta.env.MODE === "development" ? 0.01 : 60;
// const TTL_MS = TTL_MINS * 60 * 1000;
// const endpointCache = new Keyv({ namespace: 'notion-cache', ttl: TTL_MS });

export type ParentBreadcrumbSpec = {
	id: string;
	name: string;
	description?: string;
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
			const [entries, database] = await Promise.all([
				this.notion.databases.query({
					database_id: databaseId
				}),
				this.retreiveDatabase(databaseId)]
			)
			const data: ServerGetDatabaseResponse = {
				results: entries.results,
				parent: [
					{
						id: database.id,
						// @ts-ignore
						name: database?.title?.[0]?.plain_text || 'Database',
						// @ts-ignore
						description: database?.description?.[0]?.plain_text || '',
						type: 'db'
					}
				]
			};
			return data;
		};
		return withCache(cacheString, fetchDb);
	}


	async queryDatabase(databaseId: string, query: { filter?: any, sorts?: any }, depth: number): Promise<Partial<ServerGetDatabaseResponse>> {
		const cacheString = `qdb-${databaseId}`;
		const runQuery = async () => {
			try {
				let dbParams: {
					database_id: string;
					filter?: any;
				} = {
					database_id: databaseId,
				}

				if (query.filter) dbParams.filter = query.filter;

				const entries = await this.notion.databases.query(dbParams)
				const data: Partial<ServerGetDatabaseResponse> = {
					results: entries.results
				};
				return data;
			} catch {
				return {
					results: []
				}
			}
		};
		return withCache(cacheString, runQuery);
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

	generateFilter(match: {
		[key: string]: {
			results: Array<{
				id: string
			}>
		}
	}) {
		return Object.entries(match).map(([key, value], idx) =>
			value?.results?.map(result => ({
				// @ts-ignore
				property: key,
				relation: {
					contains: result.id
				}
			}))).flat(2)
	}

	buildNodes(data: {
		[key: string]: { results: (PageObjectResponse | PartialPageObjectResponse)[] }
	}){
		const nodes: Node[] = []
		const links: Link[] = []
		const dbs = Object.keys(data)
		for (let i=0; i<dbs.length; i++){
			const db = dbs[i]
			const {results} = data[db]
			for (let j=0; j<results.length; j++){
				const row = results[j]
				// @ts-ignore
				const props = row.properties
				nodes.push({
					id: row.id,
					// @ts-ignore
					name: props?.Name?.title?.[0]?.plain_text,
					type: db
				})
				for (let k=0; k<dbs.length; k++){
					const dbInner = dbs[k]
					if (dbInner === db || !props[dbInner]) continue
					const relations = props[dbInner].relation
					for (let z=0; z<relations.length; z++){
						const link = relations[z]
						links.push({
							source: row.id,
							target: link.id
						})
					}
				}
			}
		}

		return {
			nodes,
			links
		}


	}
	async queryDatabases(filter: any, databases: (BlockObjectResponse | PartialBlockObjectResponse)[], depth: number) {
		const result = await Promise.all(databases.map((db) => this.queryDatabase(db.id, {}, depth)));
		const resultAsDict = result.reduce((acc, cur, index) => ({
			...acc,
			// @ts-ignore
			[databases[index].child_database.title]: cur
		}), {}) as {
			[key: string]: {results:(PageObjectResponse | PartialPageObjectResponse)[]}
		}
		return resultAsDict
	}
	async spiderPage(pageId: string): Promise<{
		nodes: Node[];
		links: Link[];
	}> {
		const { parent, page } = await this.getPage(pageId);
		const dbName = parent[0].name;

		const databases = await this.getChildDatabases()

		// const initialFilter = this.generateFilter({
		// 	[dbName]: { results: [{ id: pageId }] }
		// })
		const initialResult = await this.queryDatabases({}, databases, 0)

		// let accumulatedResults = [initialResult];
		// let previousResults = initialResult;

		// for (let i = 1; i < 5; i++) {
		// 	const filters = this.generateFilter(previousResults)
		// 	const result = await this.queryDatabases({ or: filters }, databases, i)
		// 	accumulatedResults.push(result);
		// 	previousResults = result
		// }
		const {
			nodes,
			links
		} = this.buildNodes(initialResult)

		nodes.push({
			id: pageId,
			// @ts-ignore
			name: page.properties.Name.title[0].plain_text,
			type: "root"
		})

		// let nodes: Node[] = [];
		// let links: Link[] = [];
		
		
		// let nodeList: string[] = [];
		// const dataEntries = Object.entries(initialResult)
		// for (let i = 0; i < dataEntries.length; i++) {
		// 	const [type, value] = dataEntries[i];
		// 	const { results } = value;
		// 	for (let j = 0; j < results.length; j++) {

		// 	}
		// }

		return {
			nodes,
			links
		}
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
