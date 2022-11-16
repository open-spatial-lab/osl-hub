<script lang="ts">
	export let href: string;
</script>

<div class="card w-96 bg-gray-300 m-2 p-2">
    <a class="link-primary" {href}>
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div class="card-body">
        <slot />
        </div>
    </a>
  </div>

<style>
    .card-styles * {
        min-width:20em;
        min-height:20em;
        /* aspect-ratio: 1; */
        width: fit-content;
        height:fit-content;
    }
</style>
