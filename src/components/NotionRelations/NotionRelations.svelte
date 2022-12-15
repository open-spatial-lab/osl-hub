<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import NotionRelationCard from '../NotionRelationCard';
	const storeTab: Writable<string> = writable('a');
	export let properties: { name: string; relations: { id: string }[] }[];
</script>

<hr />
<h3>Connections</h3>
<TabGroup selected={storeTab}>
    {#each properties as property, i}
        <Tab tab={property.name}>
            {property.name}
        </Tab>
    {/each}
</TabGroup>

<!-- Conditionally display content -->
<!-- {#if $storeTab === 'a'}Content A{/if}
{#if $storeTab === 'b'}Content B{/if}
<TabContent vertical class="py-2">
    {#each properties as property, i}
        <TabPane tabId={property.name} tab={property.name} active={i===0}>
            {#each property.relations as relation}
                <NotionRelationCard id={relation.id} />
            {/each}
        </TabPane>
    {/each}
</TabContent>
<hr/> -->