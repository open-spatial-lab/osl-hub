import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser/src';
import { BlockObjectResponse, ListBlockChildrenResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const parser = NotionBlocksHtmlParser.getInstance();

export function NotionBlocks({
    blocks
}: {blocks: (BlockObjectResponse | PartialBlockObjectResponse)[]}){
    const stringifiedHtml = parser.parse(blocks);
    return <div className="" dangerouslySetInnerHTML={{__html: stringifiedHtml}} />
}