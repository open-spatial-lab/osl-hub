<script lang="ts">
  export let id: string;
  export let prefix: string = 'page'
  $: content = fetchPage(id);
  async function fetchPage(id: string) {
    const res = await fetch(`/api/notion-page/${id}`);
    const data = await res.json();
    return data;
  }
</script>

<div class="card py-2">
  {#await content}
    <p>Loading connection...</p>
  {:then content}
    {#if content?.page?.properties?.Name?.title?.[0]?.plain_text}
      <a href="/{prefix}/{id}" class="d-block ">
        <b> {content.page.properties.Name.title[0].plain_text}</b></a
      >
    {/if}
    {#if content?.page?.properties?.["Short Description"]?.rich_text?.[0]?.plain_text}
      <p>
        {content.page.properties["Short Description"].rich_text[0].plain_text}
      </p>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
