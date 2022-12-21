import notion from '$lib/utils/NotionClient';


export const load = async () => {
	const databases = await notion.getChildDatabases();
	return {
		databases
	};
};
