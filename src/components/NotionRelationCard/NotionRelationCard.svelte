<script lang="ts">
	import { Card } from 'sveltestrap';
	export let id: string;
	$: content = fetchPage(id);

	async function fetchPage(id: string) {
		const res = await fetch(`http://localhost:5173/api/notion-page/${id}`);
		const data = await res.json();
		console.log(data);
		return data;
	}
</script>

{#await content}
	<p>Loading connection...</p>
{:then content}
	<Card body class="mw-50">
		{#if content?.page?.properties?.Name?.title?.[0]?.plain_text}
			<a href={`/page/${content.page.id}`} class="d-block ">
				<b> {content.page.properties.Name.title[0].plain_text}</b></a
			>
		{/if}
		{#if content?.page?.properties?.['Short Description']?.rich_text?.[0]?.plain_text}
			<p>{content.page.properties['Short Description'].rich_text[0].plain_text}</p>
		{/if}
	</Card>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
