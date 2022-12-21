<script lang="ts">
    import type { BookmarkResponse } from "./types";
    import Icon from "@iconify/svelte";
    import NotionRelationCard from "$components/NotionRelationCard/NotionRelationCard.svelte";
    const isClient = typeof window !== "undefined";
    export let data: BookmarkResponse;
</script>

<div class="max-w-screen-2xl m-auto text-center flex flex-col space-y-8">
    {#if data.type === "success"}
        <h1>Your bookmarks</h1>
        {#if data.bookmarks.length}
            {#each data.bookmarks as bookmark}
                <div class="">
                    <NotionRelationCard id={bookmark.id.split("page/")[1]} />
                </div>
            {/each}
        {:else}
            <p>
                You don't have any bookmarks yet. Explore the hub and use the
                <Icon
                    icon="material-symbols:star-rate-outline-rounded"
                    class="w-6 h-6 inline-block"
                /> icon on an article to save it to your bookmarks.
            </p>
        {/if}
    {:else}
        <h1>Login to access your bookmarked articles</h1>
        <p>
            Signup or login to save articles and access them from any device.
            You can also create collections of articles to share.
        </p>
        <a href={isClient ? "/auth/signin" : "/"}>Login or Signup</a>
    {/if}
</div>
