<script lang="ts">
	import type { ParentBreadcrumbSpec } from 'src/utils/NotionClient';
	import { Breadcrumb, Crumb } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let steps: ParentBreadcrumbSpec[];
	export let showHome: boolean = true;
</script>

<Breadcrumb class="py-4">
	{#if showHome}
		<Crumb href="/">
			<svelte:fragment slot="lead">
				<Icon icon="material-symbols:home" class="text-xl" />			
			</svelte:fragment>
		</Crumb>
	{/if}
	{#each steps as step}
		<Crumb href={`/${step.type}/${step.id}`}>{step.name}</Crumb>
	{/each}
</Breadcrumb>