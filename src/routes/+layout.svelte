<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import './app.postcss';
	import Header from '../components/Header';
	import Footer from '../components/Footer';
	import './styles.css';
	import { page } from "$app/stores"
	console.log(page)
</script>

<div class="app flex flex-col justify-between">
	<Header />

	<main class="flex-grow-1">
		<slot />
	</main>

	<Footer />
</div>