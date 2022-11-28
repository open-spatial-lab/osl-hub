<script lang="ts">
	import { Card, CardBody, NavLink } from 'sveltestrap';
	export let href: string;
</script>

        <NavLink {href} class="fs-1 fw-bold m-0 p-0">
            <slot />
        </NavLink>
