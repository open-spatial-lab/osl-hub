
import { error } from '@sveltejs/kit';
import notion from '$lib/utils/NotionClient';
import type { PageServerLoad } from './$types';
import type { PageResponse } from './types';

export const load: PageServerLoad = async ({ params }): Promise<PageResponse> => {
    const { id } = params;
    try {
        const page = await notion.getPageContent(id)
        if (!page) {
            throw error(404, 'Not found');
        }
        return {
            type: "success",
            ...page
        }
    } catch (e) {
        return {
            type: "error",
            error: 'Not found'
        }
    }
}