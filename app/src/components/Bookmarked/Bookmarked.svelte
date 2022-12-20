<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  export let contentId: string;
  let isBookmarked: boolean;

  const handleFetch = async (action = "checkBookmark") => {
    const r = await fetch(
      `/api/bookmark?contentId=${contentId}&action=${action}`
    );
    const data = await r.json();
    isBookmarked = data.isBookmarked;
  };

  onMount(() => handleFetch());
</script>

<button
  class="btn btn-icon text-leg p-0"
  on:click={() => handleFetch(isBookmarked ? "removeBookmark" : "addBookmark")}
>
  {#if isBookmarked}
    <Icon
      icon="material-symbols:star-rate-rounded"
      class="w-8 h-8 text-accent-500"
    />
  {:else}
    <Icon icon="material-symbols:star-rate-outline-rounded" class="w-8 h-8" />
  {/if}
</button>
