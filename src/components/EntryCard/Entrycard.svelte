<script lang="ts">
	import { getPageProperty } from '@notionhq/client/build/src/api-endpoints';
	import RelationCounter from './RelationCounter.svelte';
	export let id: string | undefined;
	export let title: string | undefined;
	export let properties: any | undefined;
	let relations: Array<{ title: string; count: number }> = [];
	$: if (properties) {
		relations = Object.entries(properties)
			.filter((entry) => {
				const [key, value] = entry;
				// @ts-ignore
				return value?.type === 'relation' && properties[key].relation.length > 0;
			})
			.map((entry) => {
				const [key, value] = entry;
				return {
					title: key,
					count: properties[key].relation.length
				};
			});
	}
</script>
{#if !id || !title || !properties}
	<div>
		<h1>Page not found</h1>
	</div>
{:else}
	<div class="grid-card p-1 mb-2 bg-gray-50 dark:bg-gray-800">
		<dic class="card">
			<header class="card-header">
				<a href={`/page/${id}`}> {title}</a>
			</header>
			<div class="p-4">
				{#if 'Short Description' in properties && properties['Short Description'].rich_text.length > 0}
					{properties['Short Description'].rich_text[0].plain_text}
				{/if}
				<br />
				<a href={`/page/${id}`} class="fw-semibold pt-2 d-inline-block">Learn More</a>
			</div>
			<footer class="card-footer">
				{#each relations as relation}
					<RelationCounter title={relation.title} count={relation.count} />
				{/each}
			</footer>
		</dic>
	</div>
	<style>
		.grid-card {
			display: inline-block;
			width: 100%;
		}
		.card-title {
			width: fit-content;
		}
	</style>
{/if}