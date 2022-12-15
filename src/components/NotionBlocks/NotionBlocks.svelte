<script lang="ts">
	import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser/src';
	export let blocks: any;

	const parser = NotionBlocksHtmlParser.getInstance();
	let stringifiedHtml = '';
	$: if (blocks) {
		stringifiedHtml = parser.parse(blocks);
	}
</script>

<div class="my-4 notion-block-container">
	{@html stringifiedHtml}
</div>

<style>
	.notion-block-container {
		margin: 0 auto;
	}
	/* .notion-block-container * {
		padding: 1rem 0 !important;
	} */
</style>
