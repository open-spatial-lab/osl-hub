// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notion from "../../utils/NotionClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlockObjectResponse[]>
) {
  const data = await notion.getChildDatabases()
  const dbEntries = data.filter(entry => entry.type === "child_database")
  res.status(200).json(dbEntries);
}
