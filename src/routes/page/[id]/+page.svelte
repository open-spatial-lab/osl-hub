<script lang="ts">
	import { Alert } from '@skeletonlabs/skeleton';
	import Breadcrumbs from '../../../components/Breadcrumbs.svelte';
	import type { DatabaseResponse } from './types';

	import NotionBlocks from '../../../components/NotionBlocks';
	import NotionRelations from '../../../components/NotionRelations/NotionRelations.svelte';

	export let data: DatabaseResponse;
	$: title = data?.page?.properties?.Name?.title?.[0]?.plain_text;
	$: relationProperties = parseRelations(data?.page?.properties);

	function parseRelations(properties: any) {
		if (!properties) return [];
		const relations = [];
		for (const [key, value] of Object.entries(properties)) {
			if (value.type === 'relation') {
				relations.push({
					name: key,
					relations: value.relation
				});
			}
		}
		return relations;
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="py-4 px-4">
	<h1 class="fs-01 text-start">{title}</h1>
	{#if 'parent' in data}
		<Breadcrumbs steps={data.parent} />
	{/if}
	{#if 'content' in data}
		<NotionBlocks blocks={data?.content?.results} />
	{/if}
	<NotionRelations properties={relationProperties} />
	<Alert color="light" class="d-inline-block">
		<svelte:fragment slot="title">See something missing?</svelte:fragment>
		<span
			>OSL hub is an evolving content database. If you've spotted an error or want to contribute,
			please go to our
			<a
				href={`https://openspatial.notion.site/${data.page.url.split('https://www.notion.so/')}`}
				class="alert-link">notion site</a
			> and comment to suggest changes.</span
		>
	</Alert>
</div>
