<script lang="ts">
  import Icon from "@iconify/svelte";
  import { enhance } from "$app/forms";
  import CollectionRows from "./CollectionRows/CollectionRows.svelte";
  import type { CollectionRowsSchema } from "./CollectionRows/types";
  export let contentId: string;
  let open: boolean = false;
  let collections: CollectionRowsSchema = [];
  let name: string = ''

</script>
<div class="relative">
<form
  method="POST"
  action="/api/collection?action=checkCollectionStatus&contentId={contentId}"
  use:enhance={() => {
    return async ({ result }) => {
      open = true;
      // @ts-ignore
      if (result.collections) collections = result.collections;
    };
  }}
>
  <button class="btn btn-icon text-leg p-0">
      <Icon icon="material-symbols:create-new-folder-sharp" class="w-8 h-8" />
  </button>
</form>
{#if open}
<div class="absolute top-0 left-100 bg-surface-700 z-10 text-left shadow-lg rounded-lg p-4 w-auto" style="min-width:8rem">
  <div class="relative w-full h-full">
    <p><b>My collections</b></p>
    <CollectionRows collections={collections} contentId={contentId} />
    <button class="absolute top-0 left-0" on:click={() => open = false}>&times;</button>
    <form
      method="POST"
      action="/api/collection?action=addCollection&collection={name}"
      use:enhance={() => {
        return async ({ result }) => {
          collections.push({
            name: name,
            status: false
          });
          name = '';
          open = false;
          open = true;
        };
      }}
      >
      <div class="flex flex-row">
        
      	<input type="text" id="name" bind:value={name} minlength="2" required>
        <button class="btn btn-icon text-leg p-0">
          <Icon icon="material-symbols:add-box" class="w-8 h-8" />
        </button>
      </div>
    </form>
  </div>
</div>
{/if}
</div>