import { getCollectionClient } from "$lib/utils/collections";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const backendActions = ["addCollection", "addToCollection", "removeFromCollection", "removeCollection", "getCollection", "listCollections", "checkCollectionStatus", "checkIsInCollection"];

// @ts-ignore
export const GET: RequestHandler = async ({locals, url}) => {
    const params = url.searchParams;
    const [action, contentId, collection] = [params.get("action"), params.get("contentId"), params.get("collection")];
    if (!action || !backendActions.includes(action!)) {
        return json({ error: "Invalid action", type: "error" }, { status: 400 });
    }


    const session = await locals.getSession();
    if (!session) {
      return json({
        error: "Not logged in",
        type: "error",
      });
    }
    const username = session?.user?.email!;
    const collectionClient = getCollectionClient(username, action, contentId, collection);
    return await collectionClient.handle();
}

// @ts-ignore
export const POST = GET