<script lang="ts">
	import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavLink } from 'sveltestrap';
	import { page } from '$app/stores';
    const isLoggedIn = Object.keys($page.data.session || {}).length
    const email = $page?.data?.session?.user?.email;
    const name = $page?.data?.session?.user?.name || email;
    const image = $page?.data?.session?.user?.image;
	console.log(page)
</script>

{#if isLoggedIn}
	<Dropdown>
		<DropdownToggle caret color="light">
			{#if image}
                <img src={image} alt="" class="rounded-circle" width="26" height="26" />
                {name}
			{/if}
		</DropdownToggle>
		<DropdownMenu>
			<DropdownItem header>{email}</DropdownItem>
			<DropdownItem href="/api/auth/signout">Sign out</DropdownItem>
		</DropdownMenu>
	</Dropdown>
{:else}
	<NavLink href="/api/auth/signin">Sign In</NavLink>
{/if}
