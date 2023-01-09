<script lang="ts">
    import { onMount } from "svelte";
    import { renderForceGraph } from "./ForceGraph";
    import type { Node, Link } from "./types";

    export let contentId: string = "";

    let el: HTMLElement;

    const config = {
        databaseColors: {
            root: "#FFD400",
            Tools: "#746D75",
            Methods: "#541388",
            Projects: "#2e294e",
            Tutorials: "#d90368",
            Languages: "#8acdea",
            Templates: "#8C4843",
            Topics: "#FF5400",
        },
    };
    const nodeFill = (d: Node) => {
        return d.type in config.databaseColors
        // @ts-ignore
        ? config.databaseColors[d.type]
        : "#FF0000";
    }
    const nodeRadius = (d: Node) => {
                    if (d.type === "root") {
                        console.log(d);
                        return 15;
                    } else {
                        return 8;
                    }
                }

    const handleMouseOver = (node: MouseEvent) => {
        const text = node.target?.id;
        const textEl = document.querySelector(`#text-${text}`);
        textEl?.setAttribute("opacity", '1')
    }

    const handleMouseOff = (node: MouseEvent) => {
        const text = node.target?.id;
        const textEl = document.querySelector(`#text-${text}`);
        textEl?.setAttribute("opacity", '0')
    }
                
    onMount(async () => {
        const width = el.parentElement?.clientWidth
        const {
            data: { nodes, links },
        } = await fetch(
            `/api/spider/${contentId.split("/").slice(-1)[0]}`
        ).then((r) => r.json());
        renderForceGraph(
            {
                el,
                nodes,
                links,
            },
            {
                // @ts-ignore
                nodeRadius,
                nodeFill,
                nodeId: (d: Node) => d.id,
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOff,
                width,
                height: 400,
                nodeStrength: -100,
                onClick: handleClick,
                colors: config.databaseColors
            }
        );
    });

    function handleClick(node: MouseEvent) {
        if (
            typeof window !== "undefined" &&
            node?.target &&
            "id" in node.target
        ) {
            window.location.href = `${window.location.origin}/page/${node.target.id}`;
        }
    }
</script>

<div bind:this={el} class="chart" />

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
