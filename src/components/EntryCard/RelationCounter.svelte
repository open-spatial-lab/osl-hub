<script lang="ts">
	export let title: string;
	export let count: number;
</script>

<div class="relative inline-block mr-8">
	<span class="badge-icon badge-filled-accent absolute -top-1 -right-5 z-10">{count}</span>
	{title}
</div>
