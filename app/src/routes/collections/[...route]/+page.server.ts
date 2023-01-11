import type { PageServerLoad } from './$types';
import { getCollectionClient } from '$lib/utils/collections';

export const load: PageServerLoad = async ({ params }) => {
    const routeComponents = params.route.split('/')
    if (routeComponents.length < 2) {
        return {
            type: "error",
            error: "Invalid path"
        }
    }
    const username = routeComponents[0]
    const collectionId = routeComponents[1]
    const collectionsClient = getCollectionClient(username, "getCollection", null, collectionId)
    const response = await collectionsClient.handle()
    const data = await response?.json()
    if (data.collection) {
        return data
    } else {
        return {
            type: "error",
            error: "Could not find that collection."
        }
    }
}