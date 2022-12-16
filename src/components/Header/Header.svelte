<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import LoginDropdown from '../Login/LoginDropdown.svelte';
	import { menu } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import NavItems from './NavItems.svelte';
	import Icon from '@iconify/svelte';

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<AppBar>
	<svelte:fragment slot="lead"><a href="/">
		osl <b>hub</b>
	</a></svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex-row space-x-4 hidden md:flex">
			<NavItems />
			<!-- <LoginDropdown /> -->
			<LightSwitch />
		</div>
		<span class="relative md:hidden">

			<!-- Trigger: apply the 'use:menu' action and supply the unique menu ID -->
			<button use:menu={{ menu: 'example', interactive: true }} aria-label="Open Menu"><Icon icon="ic:round-menu" class="text-2xl"/></button>
		
			<!-- Menu: set a matching 'data-menu-[menuId]' attribute -->
			<div data-menu="example" class="flex flex-col space-y-4 bg-primary-50 p-4 shadow-xl rounded dark:bg-primary-900">

				<NavItems />
				<LightSwitch />

			</div>
			
		</span>
	</svelte:fragment>
</AppBar>
