import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { DatabaseResponse } from './types';
import type { ErrorSpec } from '../../../types/error';
import notion from '$lib/utils/NotionClient';

export const load: PageServerLoad = async ({ params }): Promise<DatabaseResponse | ErrorSpec> => {
    const { id } = params;
    try {
        const {
            results,
            parent
        } = await notion.getDatabase(id);
        if (!results) {
            throw error(404, 'Not found');
        }
        return {
            type: "success",
            results: results,
            parent: parent
        }

    } catch (e) {
        return {
            type: "error",
            error: 'Not found'
        }
    } 
}