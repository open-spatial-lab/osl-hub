import type { RequestHandler } from './$types';
import notion from '$lib/utils/NotionClient';
import { parseRelations } from "$lib/utils/relations"

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({params}) => {
  const {id} = params;
  const content = await notion.getPageContent(id);
  const relations = parseRelations(content.page.properties)
  const name = content.page.properties.Name.title[0].plain_text

  return new Response(JSON.stringify({
    relations, name
  }), {status: 200})
} 