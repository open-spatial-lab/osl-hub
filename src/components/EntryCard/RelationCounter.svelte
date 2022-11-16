<script lang="ts">
    import { Badge } from 'sveltestrap';
    export let title: string;
    export let count: number;
</script>

<Badge pill color="secondary" class="mx-1">{title}: {count}</Badge>
