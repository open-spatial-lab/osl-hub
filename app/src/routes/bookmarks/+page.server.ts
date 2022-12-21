import { getBookmarkClient } from '$lib/utils/bookmark';
import type { PageServerLoad } from './$types';
import type {BookmarkResponse } from './types'

export const load: PageServerLoad = async ({ locals }): Promise<BookmarkResponse> => {
    const session = await locals.getSession();
    if (!session) {
        return {
            type: "error",
            error: 'Not logged in'
        }
    } else {
        const username = session?.user?.email!;
        const bookmarkClient = getBookmarkClient(username);
        const bookmarks = await bookmarkClient.listBookmarks();
        return {
            type: "success",
            bookmarks
        }
    }
}