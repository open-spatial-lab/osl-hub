<script lang="ts">
	export let href: string;
</script>

<div class="w-96 bg-gray-300 m-2 transition-all shadow-none translate-y-0 hover:shadow-xl hover:-translate-y-1">
    <a class="p-4 w-full text-center block no-underline font-bold font-500" {href}>
        <slot />
    </a>
</div>