<script lang="ts">
	import type { ParentBreadcrumbSpec } from 'src/utils/NotionClient';
	import { Breadcrumb, Crumb } from '@skeletonlabs/skeleton';
	export let steps: ParentBreadcrumbSpec[];
	export let showHome: boolean = true;
</script>

<Breadcrumb class="pt-4">
	{#if showHome}
		<Crumb href="/">
			<svelte:fragment slot="lead">H</svelte:fragment>
		</Crumb>
	{/if}
	{#each steps as step}
		<Crumb href={`/${step.type}/${step.id}`}>{step.name}</Crumb>
	{/each}
</Breadcrumb>
