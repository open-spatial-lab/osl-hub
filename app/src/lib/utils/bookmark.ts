import { BOOKMARK_URL, BOOKMARK_HEADER, BOOKMARK_VALUE } from "$env/static/private";

class BookmarkManager {
  url: string;
  requestHeaders: Record<string, string>;
  username: string;

  constructor(url: string, requestHeaders: Record<string, string>, username: string) {
    this.url = url;
    this.requestHeaders = requestHeaders;
    this.username = username;
  }
  async checkBookmark(id: string) {
    const response = await fetch(`${this.url}?action=checkBookmark&username=${this.username}&contentId=${id}`, {
      headers: this.requestHeaders,
    });
    return response.status === 200;
  }
  async addBookmark(id: string) {
    const response = await fetch(`${this.url}?action=addBookmark&username=${this.username}&contentId=${id}`, {
      headers: this.requestHeaders,
    });
    return response.status === 200;
  }
  async removeBookmark(id: string) {
    const response = await fetch(`${this.url}?action=removeBookmark&username=${this.username}&contentId=${id}`, {
      headers: this.requestHeaders,
    });
    return response.status === 200 ? false : null;
  }
}

export const getBookmarkClient = (username: string) => new BookmarkManager(BOOKMARK_URL, { [BOOKMARK_HEADER]: BOOKMARK_VALUE }, username);