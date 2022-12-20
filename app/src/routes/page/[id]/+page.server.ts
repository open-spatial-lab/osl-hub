
import { error } from '@sveltejs/kit';
import notion, { type ServerGetPageContentResponse } from '$lib/utils/NotionClient';
import type { PageServerLoad } from './$types';
import type { ErrorSpec } from '../../../types/error';

export const load: PageServerLoad = async ({ params }): Promise<ServerGetPageContentResponse | ErrorSpec> => {
    const { id } = params;
    try {
        const page  = await notion.getPageContent(id);
        if (!page) {
            throw error(404, 'Not found');
        }
        return page
    } catch (e) {
        return {
            type: "error",
            error: 'Not found'
        }
    } 
}