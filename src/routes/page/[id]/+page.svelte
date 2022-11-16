<script lang="ts">
	import { Alert } from 'sveltestrap';
	import { Container } from 'sveltestrap';
	import Breadcrumbs from '../../../components/Breadcrumbs.svelte';
	import type { DatabaseResponse } from './types';

	export let data: DatabaseResponse;
	const title = data?.page?.properties?.Name?.title?.[0]?.plain_text;
	console.log(data)
</script>

<Container class="py-4 px-4" fluid>
	<h1 class="fs-01 text-start">{title}</h1>
	{#if 'parent' in data}
		<Breadcrumbs steps={data.parent} />
	{/if}
	{#if 'content' in data}
		{#each data.content.results as block}
			{#if block.image}
				{#if block.image.type === 'external'}
					<figure>
						<img src={block.image.external.url} alt={block.image.caption} />
						{#if block.image.caption}
							<figcaption>{block.image.caption}</figcaption>
						{/if}
					</figure>
				{/if}
			{:else if block.paragraph && block.paragraph.rich_text.length}
					{#each block.paragraph.rich_text as textBlock}
						{#if textBlock.type === 'text'}
							<p>{textBlock.text.content}</p>
						{/if}
					{/each}
			{/if}
		{/each}
	{/if}

	<Alert color="light" class="d-inline-block">
		<h4 class="alert-heading">See something missing?</h4>
		OSL hub is an evolving content database. If you've spotted an error or want to contribute, please go to our  
		<a href={`https://openspatial.notion.site/${data.page.url.split('https://www.notion.so/')}`} class="alert-link">notion site</a> and comment to suggest changes.
	</Alert>

</Container>
