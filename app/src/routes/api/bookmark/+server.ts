import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { getBookmarkClient } from "$lib/utils/bookmark";

const actions = ["checkBookmark", "addBookmark", "removeBookmark"];

export const GET: RequestHandler = async (request) => {
  const session = await request.locals.getSession();
  if (!session) {
    return json({
      error: "Not logged in",
      type: "error",
    });
  }
  const username = session?.user?.email!;
  const params = request.url.searchParams;
  const [action, contentId] = [params.get("action"), params.get("contentId")];
  const bookmarkClient = getBookmarkClient(username);
  let isBookmarked = false;

  if (!actions || !actions.includes(action!)) {
    return json({ error: "Invalid action", type: "error" }, { status: 400 });
  }
  if (!contentId) {
    return json({ error: "Invalid contentId", type: "error" }, { status: 400 });
  }

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
    default:
      break;
  }

  return json({ isBookmarked, contentId }, { status: 200 });
};
