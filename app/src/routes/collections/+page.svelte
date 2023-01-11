<script lang="ts">
  import type { CollectionsResponse } from "./types";
  import Icon from "@iconify/svelte";
  import NotionRelationCard from "$components/NotionRelationCard/NotionRelationCard.svelte";
  const isClient = typeof window !== "undefined";
  export let data: CollectionsResponse;

  function handleDelete(url, i) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }
</script>

<div class="max-w-screen-2xl m-auto text-center flex flex-col space-y-8">
  {#if data.type === "success"}
    <h1>Your Collections</h1>
    {#if data?.collections?.collections?.length}
      {#each data.collections.collections as collection, i}
        <div class="flex flex-row max-w-xl m-auto items-center justify-center">
          <a href="/collections/{data.session.user.email}/{collection}">
            {collection}
          </a>
          <button
            class="btn hover:btn-filled-warning mx-4"
            on:click={() => {
              handleDelete(
                `/api/collection?action=removeCollection&collection=${collection}`,
                i
              );
            }}
          >
            Delete
            <Icon icon="material-symbols:delete-forever" />
          </button>
        </div>
      {/each}
    {:else}
      <p>
        You don't have any collections yet. Explore the hub and use the
        <Icon
          icon="material-symbols:create-new-folder-sharp"
          class="w-6 h-6 inline-block"
        /> icon on an article to save it to your bookmarks.
      </p>
    {/if}
  {:else}
    <h1>Login to access your collections.</h1>
    <p>
      Signup or login to save articles and access them from any device. You can
      also create collections of articles to share.
    </p>
    <a href={isClient ? "/auth/signin" : "/"}>Login or Signup</a>
  {/if}
</div>
