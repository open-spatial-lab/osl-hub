<script lang="ts">
    import type { DatabaseResponse } from './types';
    export let data: DatabaseResponse;
</script>

{#if data.type === 'error'}
    <h1>{data.error}</h1>
{:else}
    {#each data.results as item}
        {#if 'url' in item}
            <h1>{item.url}</h1>
        {/if}
    {/each}
{/if}