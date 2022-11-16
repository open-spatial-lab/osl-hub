import type { PageLoad } from './page/$types';
import notion from '../utils/NotionClient';

const databases = await notion.getChildDatabases();

export const load: PageLoad = async () => {
	return {
		databases
	};
};
