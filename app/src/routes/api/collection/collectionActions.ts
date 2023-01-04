import { json } from "@sveltejs/kit";
import { getBookmarkClient } from "$lib/utils/bookmark";

export const backendActions = ["addCollection", "addToCollection", "removeFromCollection", "removeCollection", "getCollection", "listCollections", "checkIsInCollection"];

export const collectionActions = async (
  locals: App.Locals,
  action: string,
  contentId: string
) => {

    const session = await locals.getSession();
    if (!session) {
      return json({
        error: "Not logged in",
        type: "error",
      });
    }
    const username = session?.user?.email!;
    const bookmarkClient = getBookmarkClient(username);
    let isBookmarked: boolean | null = false;
    
    switch (action) {
      case "checkBookmark":
        isBookmarked = await bookmarkClient.checkBookmark(contentId!);
        break;
      case "addBookmark":
        isBookmarked = await bookmarkClient.addBookmark(contentId!);
        break;
      case "removeBookmark":
        isBookmarked = await bookmarkClient.removeBookmark(contentId!);
        break;
      case "toggleBookmark":
        isBookmarked = await bookmarkClient.toggleBookmark(contentId!);
        break;
      default:
        break;
    }
  
    return json({ isBookmarked, contentId }, { status: 200 });
}