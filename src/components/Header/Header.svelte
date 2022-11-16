<script lang="ts">
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		Styles
	} from 'sveltestrap';
	import NavItems from './NavItems.svelte';

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<Styles />

<Navbar color="light" light class="px-3">
	<NavbarBrand href="/" class="me-auto">osl <b>hub</b></NavbarBrand>
	<NavbarToggler on:click={toggle} class="me-1 d-block d-md-none" />
	<Collapse {isOpen} navbar>
	  <Nav navbar>
		<NavItems />
	  </Nav>
	</Collapse>
	<Nav class="d-none d-md-flex">
	  <NavItems />
	</Nav>
  </Navbar>