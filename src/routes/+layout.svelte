<script>
	import Header from '../components/Header';
	import Footer from '../components/Footer';
	import './styles.css';
</script>

<div class="app d-flex flex-column">
	<Header />

	<main class="flex-grow-1">
		<slot />
	</main>

	<Footer />
</div>