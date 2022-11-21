<script lang="ts">
    import {NotionBlocksHtmlParser} from '@notion-stuff/blocks-html-parser/src';
    export let blocks: any;
    
    const parser = NotionBlocksHtmlParser.getInstance();
    let stringifiedHtml = ''
    $: if (blocks) {
        stringifiedHtml = parser.parse(blocks);
    }
    
</script>

<div>
    {@html stringifiedHtml}
</div>