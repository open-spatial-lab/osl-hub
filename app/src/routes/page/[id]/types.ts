import type { ServerGetPageContentResponse } from "$lib/utils/NotionClient";
import type { NotionRelationEntries } from "$components/NotionRelations/types";
import type { ParentBreadcrumbSpec } from "$lib/utils/NotionClient";
import type { ContentOrError } from "$types/responses";

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
  isBookmarked: boolean;
};


export type PageResponse = ContentOrError<ServerGetPageContentResponse & {isBookmarked: boolean}>;
