<script>
	import Header from '../components/Header';
	import Footer from '../components/Footer';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>