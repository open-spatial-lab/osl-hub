import {authorize} from '../../common/authorize'
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	HUBCACHE: KVNamespace;
	PRESHARED_AUTH_HEADER_KEY: string
	PRESHARED_AUTH_HEADER_VALUE: string
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

const TTL_MIN = 60
const TTL_SECONDS = 60 * TTL_MIN

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const {
			HUBCACHE,
			PRESHARED_AUTH_HEADER_KEY,
			PRESHARED_AUTH_HEADER_VALUE
		} = env
		authorize(request.headers, PRESHARED_AUTH_HEADER_KEY, PRESHARED_AUTH_HEADER_VALUE)

		const params = new URL(request.url).searchParams
		const [action, key] = [params.get("action"),params.get("key")]

		if (!action || !key) {
			return new Response(
				"Please provide an `action` and `key` query parameter",
				{ status: 400 }
			);
		}

		switch (action) {
			case "get": {
				const value = await HUBCACHE.get(key);
				if (value === null) {
					return new Response("", { status: 204 });
				} else {
					return new Response(value, { status: 200 });
				}
			}
			case "put": {
				const content = await request.text()
				if (!content?.length) {
					return new Response(
						"You must supply a `content` value to set the cache",
						{ status: 400 }
					);
				}
				await HUBCACHE.put(key, content, { expirationTtl: TTL_SECONDS});
				return new Response("Success", { status: 200 });
			}
			default: {
				return new Response(
					"Please provide an action of `get` or `put`",
					{ status: 400 }
				);
			}
		}
	},
};