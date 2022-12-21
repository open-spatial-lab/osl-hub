import { BOOKMARK_URL, BOOKMARK_HEADER, BOOKMARK_VALUE } from "$env/static/private";

class CollectionManager {
    url: string;
    requestHeaders: Record<string, string>;
    username: string;

    constructor(url: string, requestHeaders: Record<string, string>, username: string) {
        this.url = url;
        this.requestHeaders = requestHeaders;
        this.username = username;
    }
    async listCollections() {
        const response = await fetch(`${this.url}?action=listCollections&username=${this.username}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200 ? response.json() : null;
    }
    async getCollection(collection: string) {
        const response = await fetch(`${this.url}?action=getCollection&username=${this.username}&collection=${collection}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200 ? response.json() : null;
    }
    async addCollection(collection: string) {
        const response = await fetch(`${this.url}?action=addCollection&username=${this.username}&collection=${collection}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200;
    }
    async addToCollection(collection: string, id: string) {
        const response = await fetch(`${this.url}?action=addToCollection&username=${this.username}&collection=${collection}&contentId=${id}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200;
    }
    async removeFromCollection(collection: string, id: string) {
        const response = await fetch(`${this.url}?action=removeFromCollection&username=${this.username}&collection=${collection}&contentId=${id}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200;
    }
    async removeCollection(collection: string) {
        const response = await fetch(`${this.url}?action=removeCollection&username=${this.username}&collection=${collection}`, {
            headers: this.requestHeaders,
        });
        return response.status === 200;
    }
}

export const getCollectionClient = (username: string) => new CollectionManager(BOOKMARK_URL, { [BOOKMARK_HEADER]: BOOKMARK_VALUE }, username);