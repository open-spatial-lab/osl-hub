<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import './app.postcss';
	import Header from '../components/Header/Header.svelte';
	import Footer from '../components/Footer/Footer.svelte';
	import './styles.css';
</script>

<div class="app flex flex-col justify-between">
	<Header />

	<main class="flex-grow-1">
		<slot />
	</main>

	<Footer />
</div>
