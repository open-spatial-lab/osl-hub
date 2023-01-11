import { getBookmarkClient } from '$lib/utils/bookmark';
import { getCollectionClient } from '$lib/utils/collections';
import type { PageServerLoad } from './$types';
import type {CollectionsResponse } from './types'

export const load: PageServerLoad = async ({ locals }): Promise<CollectionsResponse> => {
    const session = await locals.getSession();
    if (!session) {
        return {
            type: "error",
            error: 'Not logged in'
        }
    } else {
        const username = session?.user?.email!;
        const collectionsClient = getCollectionClient(username, "listCollections", null, null);
        const collections = await collectionsClient.handle().then(r => r?.json())
        return {
            type: "success",
            // @ts-ignore
            collections
        }
    }
}