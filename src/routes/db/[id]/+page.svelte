<script lang="ts">
	import Breadcrumbs from '../../../components/Breadcrumbs.svelte';
	import Entrycard from '../../../components/EntryCard/Entrycard.svelte';
	import type { DatabaseResponse, DisplaySchema } from './types';

	export let data: DatabaseResponse;

	let cards: Array<Partial<DisplaySchema>> = [];
	$: if (data.type === 'success') {
		cards = data.results.map((result: any) => {
			return {
				title: result?.properties?.Name?.title?.[0]?.plain_text,
				id: result?.id,
				properties: result?.properties
			};
		});
	}
	$: title = 'parent' in data ? data.parent[data.parent.length - 1].name : 'Home';
</script>

<svelte:head>
   <title>{title}</title>
</svelte:head>

<div class="p-4">
	<h1 class="fs-01 text-start">{title}</h1>
	{#if 'parent' in data}
		<Breadcrumbs steps={data.parent} />
	{/if}
	{#if data.type === 'error'}
		<h1>{data.error}</h1>
	{:else}
		<div class="card-grid">
			{#each cards as item}
				<Entrycard title={item.title} id={item.id} properties={item.properties} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.card-grid {
		columns: 2;
		column-gap: 0.5rem;
	}

	@media (min-width: 768px) {
		.card-grid {
			columns: 3;
		}
	}

	@media (min-width: 1024px) {
		.card-grid {
			columns: 4;
		}
	}
	@media (min-width: 1440px) {
		.card-grid {
			columns: 5;
		}
	}
	@media (min-width: 1920px) {
		.card-grid {
			columns: 8;
		}
	}
</style>
