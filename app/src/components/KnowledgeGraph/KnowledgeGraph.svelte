<script lang="ts">
    import { onMount } from "svelte";
    import { renderForceGraph } from "./ForceGraph";
    import type { NotionRelationEntries } from "$components/NotionRelations/types";
    import { redirect } from "@sveltejs/kit";
    import type { Node, Link } from './types';
    
    export let contentId: string = '';

    let el: HTMLElement;

    onMount(async () => {
        const {data: {nodes, links}} = await fetch(`/api/spider/${contentId.split('/').slice(-1)[0]}`)
            .then(r => r.json());
        console.log(nodes)
        renderForceGraph(
            {
                el,
                nodes,
                links,
            },
            {
                nodeRadius: (d: Node) => {
                    if (d.type === "root") {
                        console.log(d);
                        return 15
                    } else {
                        return 5
                    }
                },
                nodeId: (d: Node) => d.id,
                // onMouseOver: handleHover,
                width: 400,
                height: 400,
                // onClick: handleClick,
            }
        );
    });
</script>

<div bind:this={el} class="chart" />
<!-- <button on:click={() => updateNodes(relationProperties)}> Update </button> -->

<style>
    .chart :global(div) {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
