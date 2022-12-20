import { authorize } from "../../common/authorize";
export interface Env {
  BOOKMARK: KVNamespace;
  PRESHARED_AUTH_HEADER_KEY: string;
  PRESHARED_AUTH_HEADER_VALUE: string;
}

type BookmarkSchema = Array<{
  id: `${"page" | "db"}/${string}`;
}>;

type CollectionSchema = {
  bookmarks: BookmarkSchema;
  name: string;
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { BOOKMARK, PRESHARED_AUTH_HEADER_KEY, PRESHARED_AUTH_HEADER_VALUE } =
      env;

    authorize(
      request.headers,
      PRESHARED_AUTH_HEADER_KEY,
      PRESHARED_AUTH_HEADER_VALUE
    );

    const params = new URL(request.url).searchParams;
    const [username, action] = [params.get("username"), params.get("action")];

    if (!action || !username) {
      return new Response(
        "Please provide an `action` and `username` query parameter",
        { status: 400 }
      );
    }

    switch (action) {
      case "checkBookmark": {
        const bookmark = params.get("contentId");
        const bookmarks = await BOOKMARK.get(`${username}/bookmarks`);
        if (bookmarks === null) {
          return new Response(null, { status: 204 });
        }
        const previous: BookmarkSchema = JSON.parse(bookmarks);
        if (previous.find((b) => b.id === bookmark)) {
          return new Response("true", { status: 200 });
        }
        return new Response(null, { status: 204 });
      }
      case "listBookmarks": {
        const bookmarks = await BOOKMARK.get(`${username}/bookmarks`);
        if (bookmarks === null) {
          return new Response("No bookmarks found", { status: 404 });
        }
        return new Response(bookmarks, { status: 200 });
      }
      case "addBookmark": {
        const bookmark = params.get("contentId");
        if (!bookmark) {
          return new Response("Please provide a `bookmark` query parameter", {
            status: 400,
          });
        }
        const bookmarks = await BOOKMARK.get(`${username}/bookmarks`);
        if (bookmarks === null) {
          await BOOKMARK.put(`${username}/bookmarks`, JSON.stringify([{ id: bookmark }]));
          return new Response("Bookmark added", { status: 200 });
        } else {
          const previous: BookmarkSchema = JSON.parse(bookmarks);
          if (previous.find((b) => b.id === bookmark)) {
            return new Response("Bookmark already exists", { status: 200 });
          } else {
            const updated = JSON.stringify([...previous, { id: bookmark }]);
            await BOOKMARK.put(`${username}/bookmarks`, updated);
            return new Response("Bookmark added", { status: 200 });
          }
        }
      }
      case "removeBookmark": {
        const bookmark = params.get("contentId");
        if (!bookmark) {
          return new Response("Please provide a `bookmark` query parameter", {
            status: 400,
          });
        }
        const bookmarks = await BOOKMARK.get(`${username}/bookmarks`);
        if (bookmarks === null) {
          return new Response("No bookmarks found", { status: 404 });
        }
        const previous: BookmarkSchema = JSON.parse(bookmarks);
        const updated = JSON.stringify(
          previous.filter((b) => b.id !== bookmark)
        );
        await BOOKMARK.put(`${username}/bookmarks`, updated);
        return new Response("Bookmark removed", { status: 200 });
      }
      case "listCollections": {
        const collections = await BOOKMARK.get(`${username}/collections`);
        if (collections === null) {
          return new Response("No collections found", { status: 404 });
        }
        return new Response(collections, { status: 200 });
      }
      case "getCollection": {
        const collection = params.get("collection");
        if (!collection) {
          return new Response("Please provide a `collection` query parameter", {
            status: 400,
          });
        }
        const kv_entry = await BOOKMARK.get(
          `${username}/collections/${collection}`
        );
        if (kv_entry === null) {
          return new Response("No collection found", { status: 404 });
        }
        return new Response(kv_entry, { status: 200 });
      }
      case "addCollection": {
        const collection = params.get("collection");
        if (!collection) {
          return new Response("Please provide a `collection` query parameter", {
            status: 400,
          });
        }
        const kv_entry = await BOOKMARK.get(
          `${username}/collections/${collection}`
        );
        if (kv_entry !== null) {
          return new Response("Collection already exists", { status: 400 });
        } else {
          await BOOKMARK.put(
            `${username}/collections/${collection}`,
            JSON.stringify({ name: collection, bookmarks: [] })
          );
          return new Response("Collection added", { status: 200 });
        }
      }
      case "addToCollection": {
        const collection = params.get("collection");
        const bookmark = params.get("contentId");
        if (!collection || !bookmark) {
          return new Response(
            "Please provide a `collection` and `bookmark` query parameter",
            { status: 400 }
          );
        }
        const kv_entry = await BOOKMARK.get(
          `${username}/collections/${collection}`
        );
        if (kv_entry === null) {
          return new Response("No collection found", { status: 404 });
        }
        const previous: CollectionSchema = JSON.parse(kv_entry);
        if (previous.bookmarks.find((b) => b.id === bookmark)) {
          return new Response("Bookmark already exists", { status: 400 });
        }
        const updated = JSON.stringify({
          ...previous,
          bookmarks: [...previous.bookmarks, { id: bookmark }],
        });
        await BOOKMARK.put(`${username}/collections/${collection}`, updated);
        return new Response("Bookmark added to collection", { status: 200 });
      }
      case "removeFromCollection": {
        const collection = params.get("collection");
        const bookmark = params.get("contentId");
        if (!collection || !bookmark) {
          return new Response(
            "Please provide a `collection` and `bookmark` query parameter",
            { status: 400 }
          );
        }
        const kv_entry = await BOOKMARK.get(
          `${username}/collections/${collection}`
        );
        if (kv_entry === null) {
          return new Response("No collection found", { status: 404 });
        }
        const previous: CollectionSchema = JSON.parse(kv_entry);
        if (!previous.bookmarks.find((b) => b.id === bookmark)) {
          return new Response("Bookmark does not exist", { status: 400 });
        }
        const updated = JSON.stringify({
          ...previous,
          bookmarks: previous.bookmarks.filter((b) => b.id !== bookmark),
        });
        await BOOKMARK.put(`${username}/collections/${collection}`, updated);
        return new Response("Bookmark removed from collection", {
          status: 200,
        });
      }
      case "removeCollection": {
        const collection = params.get("collection");
        if (!collection) {
          return new Response("Please provide a `collection` query parameter", {
            status: 400,
          });
        }
        const kv_entry = await BOOKMARK.get(
          `${username}/collections/${collection}`
        );
        if (kv_entry === null) {
          return new Response("No collection found", { status: 404 });
        }
        await BOOKMARK.delete(`${username}/collections/${collection}`);
        return new Response("Collection removed", { status: 200 });
      }
    }

    return new Response("Invalid request", { status: 400 });
  },
};
