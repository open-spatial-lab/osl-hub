<script lang="ts">
  import NotionRelationCard from "$components/NotionRelationCard/NotionRelationCard.svelte";
  export let data: any;
</script>

<div class="max-w-screen-2xl p-20 xs:p-1">
  {#if data?.type === "success"}
    <h1 class="my-4">{data.collection.name}</h1>
    {#each data.collection.bookmarks as bookmark}
      <div class="">
        <NotionRelationCard id={bookmark.id.split("page/")[1]} />
      </div>
    {/each}
  {:else}
    <h1>Sorry, we couldn't find that collection.</h1>
  {/if}
</div>