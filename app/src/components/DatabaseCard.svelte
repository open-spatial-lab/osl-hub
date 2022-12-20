<script lang="ts">
		export let href: string;
</script>

<a {href} class="btn m-2 inline-block text-2xl btn-ringed">
	<slot />
</a>