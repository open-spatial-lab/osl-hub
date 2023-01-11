<script lang="ts">
  import { enhance } from "$app/forms";
  import Icon from "@iconify/svelte";
  import type { CollectionRowsSchema } from "./types";

  export let collections: CollectionRowsSchema = [];
  export let contentId: string = "";
  
  let collectionsOptimistic = collections;
  $: collectionsOptimistic = collections;
</script>

<div class="p-1 max-h-52 overflow-y-auto" >
  {#each collectionsOptimistic as collection, i}
    <form
      method="POST"
      action="/api/collection?action={collection.status
        ? 'removeFromCollection'
        : 'addToCollection'}&contentId={contentId}&collection={collection.name}"
      use:enhance={() => {
        return async ({ result }) => {
          // @ts-ignore
          collections[i].status = !collections[i].status;
        };
      }}
    >
      <button class="btn btn-sm px-0 text-left w-auto">
        {#if collection.status}
        <Icon icon="mdi:checkbox-marked" class="mr-2 w-6 h-6" />
        {:else}
        <Icon icon="mdi:checkbox-blank-outline" class="mr-2 w-6 h-6" />
        {/if}
        {collection.name}
      </button>
    </form>
  {/each}
</div>
