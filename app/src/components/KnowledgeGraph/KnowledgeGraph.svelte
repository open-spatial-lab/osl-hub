<script lang="ts">
    import { onMount } from "svelte";
    import { renderForceGraph } from "./ForceGraph";
    import type { NotionRelationEntries } from "$components/NotionRelations/types";
    import { redirect } from "@sveltejs/kit";

    type Node = {
        id: string;
        notionId: string;
        type: string;
    };
    type Link = {
        source: string;
        target: string;
    };

    export let relationProperties: NotionRelationEntries = [];
    let nodes: Node[] = [];
    let links: Link[] = [];
    let loadedNodes = ["root"];

    const updateNodes = (relationProperties: NotionRelationEntries) => {
        let tempNodes: Node[] = [
            ...nodes,
            {
                id: "root",
                notionId: "root",
                type: "root",
            },
        ];
        let tempLinks: Link[] = [...links];
        relationProperties.forEach(({ name, relations }) => {
            relations.forEach(({ id }) => {
                tempNodes.push({
                    id,
                    notionId: id,
                    type: name,
                });
                tempLinks.push({
                    source: "root",
                    target: id,
                });
            });
        });
        nodes = tempNodes;
        links = tempLinks;
    };

    const addNodes = (
        relationProperties: NotionRelationEntries,
        rootId: string
    ) => {
        let tempNodes: Node[] = [...nodes];
        let tempLinks: Link[] = [...links];
        relationProperties.forEach(({ name, relations }) => {
            relations.forEach(({ id }) => {
                if (tempNodes.find((f) => f.id === id)) return;
                tempNodes.push({
                    id,
                    notionId: id,
                    type: name,
                });
                tempLinks.push({
                    source: rootId,
                    target: id,
                });
            });
        });
        nodes = tempNodes;
        links = tempLinks;
        loadedNodes.push(rootId);
        renderForceGraph(
            {
                el,
                nodes,
                links,
            },
            {
                nodeRadius: (d: Node) => (d.id === "root" ? 15 : 5),
                nodeId: (d: Node) => d.notionId,
                onMouseOver: handleHover,
                width: 400,
                height: 400,
                onClick: handleClick,
            }
        );
    };

    async function handleHover(node: PointerEvent) {
        if (
            !node?.target ||
            !("id" in node.target) ||
            loadedNodes.includes(node.target.id as string)
        )
            return;
        const rootId = node.target.id as string;
        const response = await fetch(`/api/notion/relations/${rootId}`);
        const data = await response.json();
        addNodes(data.relations, rootId);
    }

    function handleClick(node: PointerEvent) {
        if (
            !node?.target ||
            !("id" in node.target) ||
            typeof window === "undefined"
        )
            return;
        const contentId = node.target.id;
        if (contentId === "root") return;
        window.location.href = `/page/${node.target.id as string}`;
    }

    $: {
        updateNodes(relationProperties);
    }

    let el: HTMLElement;

    onMount(() => {
        renderForceGraph(
            {
                el,
                nodes,
                links,
            },
            {
                nodeRadius: (d: Node) => (d.id === "root" ? 15 : 5),
                nodeId: (d: Node) => d.notionId,
                onMouseOver: handleHover,
                width: 400,
                height: 400,
                onClick: handleClick,
            }
        );
    });
</script>

<div bind:this={el} class="chart" />
<button on:click={() => updateNodes(relationProperties)}> Update </button>

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
