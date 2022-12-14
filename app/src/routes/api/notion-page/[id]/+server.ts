import type { RequestHandler } from './$types';
import notion from '$lib/utils/NotionClient';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({params}) => {
  const {id} = params;
  const content = await notion.getPageContent(id);

  return new Response(JSON.stringify(content), {status: 200})
} 