import type { PageLoad } from './page/$types';
import { SECRET_NOTION_KEY, SECRET_ROOT_PAGE } from '$env/static/private';
import NotionClient from '../utils/NotionClient';

const notion = new NotionClient(SECRET_NOTION_KEY, SECRET_ROOT_PAGE);
const databases = await notion.getChildDatabases();

export const load: PageLoad = async () => {
	return {
		databases
	};
};
