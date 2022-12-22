
import { error } from '@sveltejs/kit';
import notion from '$lib/utils/NotionClient';
import { bookmarkActions } from '../../api/bookmark/bookmarkActions';
import type { PageServerLoad } from './$types';
import type { PageResponse } from './types';

export const load: PageServerLoad = async ({ params, locals }): Promise<PageResponse> => {
    const { id } = params;
    try {
        const page = await notion.getPageContent(id)
        const isBookmarked = await bookmarkActions(locals, "checkBookmark", `/page/${id}`).then(r => r.json())
        if (!page) {
            throw error(404, 'Not found');
        }
        return {
            type: "success",
            isBookmarked: isBookmarked.isBookmarked,
            ...page
        }
    } catch (e) {
        return {
            type: "error",
            error: 'Not found'
        }
    }
}