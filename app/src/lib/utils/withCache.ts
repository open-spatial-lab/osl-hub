import { CACHE_URL, CACHE_HEADER, CACHE_VALUE } from "$env/static/private";

class Cache {
  url: string;
  requestHeaders: Record<string, string>;

  constructor(url: string, requestHeaders: Record<string, string>) {
    this.url = url;
    this.requestHeaders = requestHeaders;
  }
  public async get(key: string) {
    const response = await fetch(`${this.url}?action=get&key=${key}`, {
      headers: this.requestHeaders,
    });
    if (response.status !== 200) {
      return null;
    }
    return await response.json();
  }
  public async set(key: string, value: any) {
    await fetch(`${this.url}?action=put&key=${key}`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: this.requestHeaders,
    });
  }
}

const endpointCache = new Cache(CACHE_URL, { [CACHE_HEADER]: CACHE_VALUE });

export const withCache = async <T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> => {
  const cached = await endpointCache.get(key);
  if (cached) {
    return cached;
  }
  const result = await fn();
  await endpointCache.set(key, result);
  return result;
};
