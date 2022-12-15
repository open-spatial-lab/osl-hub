<script lang="ts">
	import Card from '../components/DatabaseCard.svelte';
	import { GradientHeading } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { HomePageSchema } from '../types/block';
	import { writable, type Writable } from 'svelte/store';
    import Typewriter from 'svelte-typewriter'
	import Icon from '@iconify/svelte';


	export let data: HomePageSchema;
	const { databases } = data;
	const storeTab: Writable<string> = writable('learning');
	let entrypoint = '';
	const handleEntrypoint = (label: string) => (entrypoint = label);
	const topicsDb = databases.find(
		(db) => 'child_database' in db && db.child_database.title === 'Topics'
	)?.id;
	const languagesDb = databases.find(
		(db) => 'child_database' in db && db.child_database.title === 'Languages'
	)?.id;
	const projectsDb = databases.find(
		(db) => 'child_database' in db && db.child_database.title === 'Projects'
	)?.id;
	const typewriterText = [
		"Data",
"Knowledge",
"Impact",
"Research",
"Tools"
	]
</script>
<svelte:head>
	<title>osl hub</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="flex flex-col items-center py-20">
	<div class="flex-col flex max-w-screen-2xl p-8 justify-center align-center space-y-2  lg:flex-row space-x-2">
		<GradientHeading
			tag="h1"
			class="text-6xl text-left basis-9/12 md:text-8xl"
			direction="bg-gradient-to-r"
			from="from-accent-500"
			to="to-primary-500">
			<Typewriter mode="loopRandom" element="span" class="inline-block" interval={25} unwriteInterval={25} cursor={false} wordInterval={3000}>
				{#each typewriterText as text}
					<h1 class="text-accent-500 inline-block text-6xl text-left md:text-8xl dark:text-accent-500 underline">{text}</h1>
				{/each}
			</Typewriter>
			<br/>
			 shouldn't have <br/>dead ends.</GradientHeading
		>
		<div class="basis-3/12 p-4 bg-surface-100 dark:bg-surface-800">
			<TabGroup selected={storeTab}>
				<Tab value="learning">
					<Icon icon="material-symbols:menu-book-outline-sharp" class="text-xl mr-1 inline-block"/>
					Learning
				</Tab>
				<Tab value="sharing">
					<Icon icon="ic:baseline-share" class="text-xl mr-1 inline-block"/>
					Sharing
				</Tab>
			</TabGroup>
			<div class="py-4">
				{#if $storeTab === 'learning'}
					<p>
						Learning data science needs a
						<GradientHeading
							tag="span"
							direction="bg-gradient-to-r"
							from="from-primary-400"
							to="to-tertiary-400">network</GradientHeading
						>
						of information. Methods, programming languages, tools, and data are all interconnected.
					</p>
					<p class="py-4">Get started by exploring...</p>
					<div>
						<a
							href={`/db/${topicsDb}`}
							class="inline-block p-1 px-2 bg-accent-500 text-surface-100 mb-1 btn rounded-3xl"
							>Topics</a
						>
						<a
							href={`/db/${projectsDb}`}
							class="inline-block p-1 px-2 bg-tertiary-500 text-surface-100 mb-1 btn rounded-3xl"
							>Projects</a
						>
						<a
							href={`/db/${languagesDb}`}
							class="inline-block p-1 px-2 bg-primary-500 text-surface-100 mb-1 btn rounded-3xl"
							>Programming Languages</a
						>
					</div>
					{entrypoint}
				{/if}
				{#if $storeTab === 'sharing'}
					<p>
						Your work
						<GradientHeading
							tag="span"
							direction="bg-gradient-to-r"
							from="from-accent-400"
							to="to-primary-400">counts.</GradientHeading
						> Share your data science methods, projects, tools, and learnings here on the hub and connect
						it to other entries. Helps others to learn and keep your work visible.
					</p>
					<a href="/share" class="my-4 btn-ringed-accent btn w-full">Add your work</a>
				{/if}
			</div>
		</div>
	</div>
	<div>
		<section class="align-items-start p-4">
			{#each databases as database}
				<Card href={`/db/${database.id}`}>
					{"child_database" in database ? database.child_database.title : ""}
				</Card>
			{/each}
		</section>
	</div>
</div>
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>