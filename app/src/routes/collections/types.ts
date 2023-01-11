import type { ContentOrError } from "$types/responses";

export type CollectionSchema = Array<{name: string, bookmarks: Array<string>}>

export type CollectionsResponse = ContentOrError<{bookmarks: CollectionSchema}>