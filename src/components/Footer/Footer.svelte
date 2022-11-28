<script lang="ts">
	import { Col, Container, Row, NavLink, ListGroup, ListGroupItem } from 'sveltestrap';
	import type { FooterColumn } from './types';
	import dsiLogo from '$lib/images/dsi.png';
	import csdsLogo from '$lib/images/csds.png';
	import rwjfLogo from '$lib/images/rwjf.jpg';

	const NavColumn: FooterColumn = [
		{
			header: 'Open Spatial Lab Hub'
		},
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'About',
			link: '/about'
		},
		{
			text: 'Contact',
			link: '/contact'
		},
		{
			text: 'Github',
			link: 'https://github.com/open-spatial-lab'
		}
	];

	const UChicagoColumn: FooterColumn = [
		{
			header: 'University of Chicago'
		},
		{
			link: 'https://datascience.uchicago.edu/',
			image: dsiLogo,
			text: 'The Data Sceince Institute'
		},
		{
			image: csdsLogo,
			text: 'The Center for Spatial Data Science',
			link: 'https://spatial.uchicago.edu/'
		}
	];

	const AcknowledgementsColumn: FooterColumn = [
		{
			header: 'Acknowledgements'
		},
		{
			image: rwjfLogo,
			text: 'The Robert Wood Johnson Foundation',
			link: 'https://www.rwjf.org/'
		},
		{
			text: 'Support for the Open Spatial Lab is provided in part by the Robert Wood Johnson Foundation'
		}
	];

	const FooterContent: Array<FooterColumn> = [NavColumn, UChicagoColumn, AcknowledgementsColumn];
</script>

<Container fluid class="bg-white">
	<Row>
		{#each FooterContent as FooterColumn}
			<Col xs="12" md="4" class="p-4">
				<ListGroup flush>
					{#each FooterColumn as Entry}
						<ListGroupItem>
							{#if Entry.header}
								<h5>{Entry.header}</h5>
							{:else if Entry.image}
								<NavLink href={Entry.link} class="py-2">
									<img src={Entry.image} alt={Entry.text} class="footer-image d-block mx-auto d-md-inline" />
								</NavLink>
							{:else}
								<NavLink href={Entry.link}>{Entry.text}</NavLink>
							{/if}
						</ListGroupItem>
					{/each}
				</ListGroup>
			</Col>
		{/each}
	</Row>
</Container>

<style>
	.footer-image {
		max-width: 100%;
		max-height: 125px;
	}
</style>
