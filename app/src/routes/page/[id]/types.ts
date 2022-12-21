import type { ErrorSpec } from "src/types/error";
import type { ServerGetPageContentResponse } from "$lib/utils/NotionClient";
import type { NotionRelationEntries } from "$components/NotionRelations/types";
import type { ParentBreadcrumbSpec } from "$lib/utils/NotionClient";

export type DisplaySchema = {
  title: string;
  id: string;
  properties: { [key: string]: any };
};


export type PageState = {
  title: string;
  relationProperties: NotionRelationEntries;
  breadcrumbs: ParentBreadcrumbSpec[];
  blocks: Array<any>;
  notionUrl: string;
};

export type NotionContentOrError<T> =
  | ({
    type: "success";
  } & T)
  | ({
    type: "error";
  } & ErrorSpec);


export type PageResponse = NotionContentOrError<ServerGetPageContentResponse>;
