<script lang="ts">
  import Icon from "@iconify/svelte";
  import { enhance } from "$app/forms";
  import CollectionRows from "./CollectionRows/CollectionRows.svelte";
  import type { CollectionRowsSchema } from "./CollectionRows/types";
  export let contentId: string;
  export let title: string;
  let open: boolean = false;
  let collections: CollectionRowsSchema = [];
  let activeCollections: CollectionRowsSchema = [];

  let filterText: string = '';
  let name: string = '';

  function handleAddCollection() {
    collections = [
      ...collections,
      {
        name: name,
        status: false
      }
    ]
    activeCollections = collections
    name = ''
  }

  function handleFilterCollections() {
    if (!filterText.length) return activeCollections = collections
    activeCollections = collections.filter((collection) => {
      return collection.name.toLowerCase().includes(filterText.toLowerCase())
    })
  }
  
</script>
<div class="relative">
<form
  method="POST"
  action="/api/collection?action=checkCollectionStatus&contentId={contentId}"
  use:enhance={() => {
    return async ({ result }) => {
      open = true;
      // @ts-ignore
      if (result.collections) {
        // @ts-ignore
        collections = result.collections;
        // @ts-ignore
        activeCollections = result.collections;
      }
    };
  }}
>
  <button class="btn btn-icon text-leg p-0">
      <Icon icon="material-symbols:create-new-folder-sharp" class="w-8 h-8" />
  </button>
</form>
{#if open}
<div class="absolute top-0 left-100 bg-surface-700 z-10 text-left shadow-lg rounded-lg p-3 w-auto" style="min-width:16rem">
  <div class="relative w-full h-full">
    <p><b>{title} in my collections</b></p>
    <input class="my-1" type="text" id="filter" bind:value={filterText} on:input={handleFilterCollections} placeholder="Filter collections" minlength="2" required>
    <CollectionRows collections={activeCollections} contentId={contentId} />
    <button class="absolute top-0 right-0" on:click={() => open = false}>&times;</button>
    <form
      method="POST"
      action="/api/collection?action=addCollection&collection={name}"
      use:enhance={handleAddCollection}
      >
      <div class="flex flex-row">
        
      	<input type="text" id="name" bind:value={name} placeholder="Add a collection" minlength="2" required>
        <button class="btn btn-icon text-leg p-0">
          <Icon icon="material-symbols:create-new-folder-sharp" class="w-8 h-8" />
        </button>
      </div>
    </form>
  </div>
</div>
{/if}
</div>