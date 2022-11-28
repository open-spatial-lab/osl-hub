<script lang="ts">
	import { TabContent, TabPane } from 'sveltestrap';
	import NotionRelationCard from '../NotionRelationCard';
	export let properties: { name: string; relations: { id: string }[] }[];
</script>

<hr/>
<h3>Connections</h3>
<TabContent vertical class="py-2">
    {#each properties as property, i}
        <TabPane tabId={property.name} tab={property.name} active={i===0}>
            {#each property.relations as relation}
                <NotionRelationCard id={relation.id} />
            {/each}
        </TabPane>
    {/each}
</TabContent>
<hr/>