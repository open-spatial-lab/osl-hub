<script lang="ts">
	import { NavItem, NavLink } from 'sveltestrap';
	import { page } from "$app/stores"
</script>

<NavItem>
	<NavLink href="/">Home</NavLink>
</NavItem>
<NavItem>
	<NavLink href="/about">About</NavLink>
</NavItem>
<NavItem>
	<NavLink href="/about">Contact</NavLink>
</NavItem>
<NavItem>
	<NavLink href="https://github.com/open-spatial-lab"><i class="bi bi-github"></i></NavLink>
</NavItem>