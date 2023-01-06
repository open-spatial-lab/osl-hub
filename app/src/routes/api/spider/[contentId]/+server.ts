import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import notion from '$lib/utils/NotionClient';

export const GET: RequestHandler = async ({ params, url }) => {
    const { contentId } = params;
    const data = await notion.spiderPage(contentId);

    return json({ data }, { status: 200 });
}