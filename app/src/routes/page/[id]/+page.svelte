<script lang="ts">
  import { Alert } from "@skeletonlabs/skeleton";
  import Breadcrumbs from "../../../components/Breadcrumbs.svelte";
  import type { PageResponse } from "./types";
  import NotionBlocks from "../../../components/NotionBlocks";
  import NotionRelations from "../../../components/NotionRelations/NotionRelations.svelte";
  import Bookmark from "../../../components/Bookmarked";
  import { page } from "$app/stores";
  import type { PageState } from "./types";

  export let data: PageResponse;

  const initialState: PageState = {
    title: "Open Spatial Lab Hub",
    relationProperties: [],
    breadcrumbs: [],
    blocks: [],
    notionUrl: "",
  };
  let pageProps: PageState = initialState;

  $: contentId = $page.url.pathname;
  $: {
    console.log(data)
    if (data.type === "success" && "properties" in data.page && "title" in data.page.properties.Name) {
      // const content = data?.page
      pageProps = {
        title: data.page.properties.Name.title?.[0]?.plain_text,
        relationProperties: parseRelations(data.page.properties),
        breadcrumbs: data.parent || [],
        blocks: data.content.results || [],
        notionUrl: `https://openspatial.notion.site/${(
          data.page.url || ""
        ).split("https://www.notion.so/")}`,
      };
    } else {
      pageProps = initialState;
    }
  }

  function parseRelations(properties: any) {
    if (!properties) return [];
    const relations = [];
    const entries = Object.entries(properties) as [
      string,
      { type: string; relation: { id: string }[] }
    ][];

    for (const [key, value] of entries) {
      if (value.type === "relation") {
        relations.push({
          name: key,
          relations: value.relation,
        });
      }
    }
    return relations;
  }
</script>

<svelte:head>
  <title>{pageProps.title}</title>
</svelte:head>
<div
  class="py-4 px-4 max-w-3xl mx-auto my-10 bg-neutral-50 shadow-2xl dark:bg-neutral-800"
>
  <article>
    <div class="flex flex-row">
      <h1 class="fs-01 text-start">{pageProps.title}</h1>
      <Bookmark {contentId} />
    </div>
    <Breadcrumbs steps={pageProps.breadcrumbs} />
    <NotionBlocks blocks={pageProps.blocks} />
  </article>
  <NotionRelations properties={pageProps.relationProperties} />
  <Alert color="light" class="mt-10">
    <svelte:fragment slot="title">See something missing?</svelte:fragment>
    <span>
      OSL hub is an evolving content database. If you've spotted an error or
      want to contribute, please go to our
      <a href={pageProps.notionUrl} class="alert-link">notion site</a> and
      comment to suggest changes.</span
    >
  </Alert>
</div>
