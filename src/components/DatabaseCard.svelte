<script lang="ts">
	import cx from 'classnames'
	export let href: string;
</script>

<a {href} class="btn m-2 inline-block text-2xl btn-filled">
	<slot />
</a>