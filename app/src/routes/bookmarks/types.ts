import type { ContentOrError } from "$types/responses";

export type BookmarkSchema = Array<{id: string}>

export type BookmarkResponse = ContentOrError<{bookmarks: BookmarkSchema}>