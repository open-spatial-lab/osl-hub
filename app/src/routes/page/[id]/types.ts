import type { ErrorSpec } from "src/types/error";
import type { ServerGetPageContentResponse } from "$lib/utils/NotionClient";

export type ContentResponse = {
  page: ServerGetPageContentResponse;
};

export type PageResponse =
  | ({
      type: "success";
    } & ContentResponse)
  | ({
      type: "error";
    } & ErrorSpec);

export type DisplaySchema = {
  title: string;
  id: string;
  properties: { [key: string]: any };
};
