import { error } from '@sveltejs/kit';
import NotionClient from '../../../utils/NotionClient';
import { SECRET_NOTION_KEY, SECRET_ROOT_PAGE } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { DatabaseResponse } from './types';
import type { ErrorSpec } from '../../../types/error';

const notion = new NotionClient(SECRET_NOTION_KEY, SECRET_ROOT_PAGE);

export const load: PageServerLoad = async ({ params }): Promise<DatabaseResponse | ErrorSpec> => {
    const { id } = params;
    try {
        const database = await notion.getDatabase(id);
        if (!database?.results) {
            throw error(404, 'Not found');
        }
        return {
            type: "success",
            results: database.results
        }

    } catch (e) {
        return {
            type: "error",
            error: 'Not found'
        }
    } 
}