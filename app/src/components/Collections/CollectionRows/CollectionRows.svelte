<script lang="ts">
  import { enhance } from "$app/forms";
  import Icon from "@iconify/svelte";
  import { afterUpdate } from "svelte";
  import type { CollectionRowsSchema } from "./types";

  export let collections: CollectionRowsSchema = [];
  export let contentId: string = "";

  // afterUpdate(() => {
  //   console.log(collections);
  // });
</script>

<div class="p-1 pt-4">
  {#each collections as collection, i}
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
        {collection.name}
        {#if collection.status}
          <Icon icon="ic:baseline-remove-circle" class="w-8 h-8" />
        {:else}
          <Icon icon="material-symbols:add-box" class="w-8 h-8" />
        {/if}
      </button>
    </form>
  {/each}
</div>
