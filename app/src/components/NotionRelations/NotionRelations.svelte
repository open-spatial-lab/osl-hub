<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import NotionRelationCard from '../NotionRelationCard';

	export let properties: { name: string; relations: { id: string }[] }[];
	const storeTab: Writable<string> = writable(properties.length ? properties.find(f => f.relations.length)?.name : '');

    const findTab = (tabName: string) => {
        return properties.find(f => f.name === tabName)?.relations || []
    }
</script>

<hr />
<h3>Connections</h3>
<TabGroup selected={storeTab}>
    {#each properties.filter(f => f.relations.length) as property, i}
        <Tab value={property.name}>
            {property.name}
        </Tab>
    {/each}
</TabGroup>
{#each findTab($storeTab) as relation}
    <NotionRelationCard id={relation.id} />
{/each}