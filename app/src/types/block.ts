import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export type HomePageSchema = {
    databases: (PartialBlockObjectResponse | BlockObjectResponse)[]
}