import { json } from "@sveltejs/kit";
import {
  BOOKMARK_URL,
  BOOKMARK_HEADER,
  BOOKMARK_VALUE,
} from "$env/static/private";

class CollectionManager {
  url: string;
  requestHeaders: Record<string, string>;
  username: string;
  action: string;
  contentId: string | null;
  collection: string | null;

  constructor(
    url: string,
    requestHeaders: Record<string, string>,
    username: string,
    action: string,
    contentId: string | null,
    collection: string | null
  ) {
    this.url = url;
    this.requestHeaders = requestHeaders;
    this.username = username;
    this.action = action;
    this.contentId = contentId;
    this.collection = collection;
  }

  async handle() {
    switch (this.action) {
      case "listCollections": {
        const collections = await this.listCollections();
        return json({ collections, type: "success" }, { status: 200 });
      }
      case "addCollection": {
        const response = await this.addCollection();
        if (response.status === 200) {
          return json(
            { response, type: "success" },
            { status: response.status }
          );
        } else {
          return json(
            { error: "Failed to create collection", response, type: "error" },
            { status: response.status }
          );
        }
      }
      case "addToCollection": {
        if (!this.contentId || !this.collection) return;
        const response = await this.addToCollection();
        if (response.status === 200) {
          return json({ response, type: "success" }, { status: 200 });
        }
        return json(
          { error: "Failed to add to collection", response, type: "error" },
          { status: 500 }
        );
      }
      case "getCollection": {
        //   if (!this.collection) return json({ error: "No collection provided", type: "error" }, { status: 500 });
        const response = await this.getCollection();
        return json({ collection: response, type: "success" }, { status: 200 });
      }
      case "checkIsInCollection": {
        break;
      }
      case "checkCollectionStatus": {
        if (!this.contentId) {
          return json({
            error: "No contentId provided",
            type: "error",
          });
        }
        const collections = await this.checkCollectionStatus();
        return json({ collections, type: "success" }, { status: 200 });
      }
      case "removeFromCollection": {
        if (!this.contentId || !this.collection) {
          return json({
            error: "No contentId or collection provided",
            type: "error",
          });
        }
        const response = await this.removeFromCollection();
        if (response.status === 200) {
          return json({ response, type: "success" }, { status: 200 });
        }
        return json(
          {
            error: "Failed to remove from collection",
            response,
            type: "error",
          },
          { status: 500 }
        );
      }
      case "removeCollection": {
        if (!this.collection) {
          return json({
            error: "No collection provided",
            type: "error",
          });
        }
        const response = await this.removeCollection();
        console.log(response.status);
        if (response.status === 200) {
          return json({ response, type: "success" }, { status: 200 });
        }
        return json(
          {
            error: "Failed to remove collection",
            response,
            type: "error",
          },
          { status: 500 }
        );
      }
      default:
        break;
    }
  }
  listCollections() {
    return fetch(
      `${this.url}?action=listCollections&username=${this.username}`,
      {
        headers: this.requestHeaders,
      }
    ).then((r) => (r.ok ? r.json() : []));
  }
  getCollection() {
    return fetch(
      `${this.url}?action=getCollection&username=${this.username}&collection=${this.collection}`,
      {
        headers: this.requestHeaders,
      }
    ).then((r) => (r.ok ? r.json() : null));
  }
  addCollection() {
    return fetch(
      `${this.url}?action=addCollection&username=${this.username}&collection=${this.collection}`,
      {
        headers: this.requestHeaders,
      }
    );
  }
  addToCollection() {
    return fetch(
      `${this.url}?action=addToCollection&username=${this.username}&collection=${this.collection}&contentId=${this.contentId}`,
      {
        headers: this.requestHeaders,
      }
    );
  }
  removeFromCollection() {
    return fetch(
      `${this.url}?action=removeFromCollection&username=${this.username}&collection=${this.collection}&contentId=${this.contentId}`,
      {
        headers: this.requestHeaders,
      }
    );
  }
  removeCollection() {
    return fetch(
      `${this.url}?action=removeCollection&username=${this.username}&collection=${this.collection}`,
      {
        headers: this.requestHeaders,
      }
    );
  }
  checkCollectionStatus() {
    return fetch(
      `${this.url}?action=checkCollectionStatus&username=${this.username}&contentId=${this.contentId}`,
      {
        headers: this.requestHeaders,
      }
    ).then((r) => (r.ok ? r.json() : {}));
  }
}

export const getCollectionClient = (
  username: string,
  action: string,
  contentId: string | null,
  collection: string | null
) =>
  new CollectionManager(
    BOOKMARK_URL,
    { [BOOKMARK_HEADER]: BOOKMARK_VALUE },
    username,
    action,
    contentId,
    collection
  );
