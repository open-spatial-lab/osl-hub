<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import LoginDropdown from '../Login/LoginDropdown.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import NavItems from './NavItems.svelte';

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<AppBar>
	<svelte:fragment slot="lead"><a href="/">
		osl <b>hub</b>
	</a></svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex flex-row space-x-4">
			<NavItems />
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppBar>
