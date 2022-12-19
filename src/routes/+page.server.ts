import type { PageLoad } from './page/$types';
import notion from '../utils/NotionClient';


export const load: PageLoad = async () => {
	const databases = await notion.getChildDatabases();
	return {
		databases
	};
};
