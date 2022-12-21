<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import NotionRelationCard from '../NotionRelationCard';
    import  type {  NotionRelationEntries } from './types';
    // utils and types
    const findFirstRelation = (properties: NotionRelationEntries) => properties.length ? properties.find(f => f.relations.length)?.name || '' : '';
    const findTab = (tabName: string, properties: NotionRelationEntries) => properties.find(f => f.name === tabName)?.relations || []

    // store and props
	export let properties: NotionRelationEntries
	const storeTab: Writable<string> = writable(findFirstRelation(properties));
    
    $: {
        storeTab.set(findFirstRelation(properties))
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
{#each findTab($storeTab, properties) as relation}
    <NotionRelationCard id={relation.id} />
{/each}