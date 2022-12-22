<script lang="ts">
  import Icon from "@iconify/svelte";
  import { enhance } from "$app/forms";
  export let contentId: string;
  export let initialBookmarkState: boolean;
  let isBookmarked: boolean = initialBookmarkState || false;
  $: isBookmarked = initialBookmarkState;
</script>

<form
  method="POST"
  action="/api/bookmark"
  use:enhance={() => {
    return async ({ result }) => {
      // @ts-ignore
      isBookmarked = result.data;
    };
  }}
>
  <input class="hidden" name="contentId" bind:value={contentId} />
  <input
    class="hidden"
    type="checkbox"
    name="isBookmarked"
    bind:value={isBookmarked}
  />
  <button class="btn btn-icon text-leg p-0">
    {#if isBookmarked}
      <Icon
        icon="material-symbols:star-rate-rounded"
        class="w-8 h-8 text-accent-500"
      />
    {:else}
      <Icon icon="material-symbols:star-rate-outline-rounded" class="w-8 h-8" />
    {/if}
  </button>
</form>
