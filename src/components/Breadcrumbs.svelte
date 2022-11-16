<script lang="ts">
	import type { ParentBreadcrumbSpec } from 'src/utils/NotionClient';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	export let steps: ParentBreadcrumbSpec[];
	export let showHome: boolean = true;
</script>

<Breadcrumb class="pt-4">
	{#if showHome}
		<BreadcrumbItem>
			<a href="/">Home</a>
		</BreadcrumbItem>
	{/if}
	{#each steps as step}
		<BreadcrumbItem>
			<a href={`/${step.type}/${step.id}`}>{step.name}</a>
		</BreadcrumbItem>
	{/each}
</Breadcrumb>

<Breadcrumb />
