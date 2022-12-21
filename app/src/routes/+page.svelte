<script lang="ts">
  import Card from '$components/DatabaseCard.svelte'
  import { GradientHeading } from "@skeletonlabs/skeleton";
  import { TabGroup, Tab } from "@skeletonlabs/skeleton";
  import type { HomePageSchema } from "../types/block";
  import { writable, type Writable } from "svelte/store";
  import Typewriter from "svelte-typewriter";
  import Icon from "@iconify/svelte";
  import IllustrationSvg from "$components/IllustrationSVG.svelte";
  import { Alert } from '@skeletonlabs/skeleton';
  import { scrollTo } from "$lib/utils/scroll";

  export let data: HomePageSchema;

  const { databases } = data;
  const storeTab: Writable<string> = writable("learning");
  let entrypoint = "";
  const handleEntrypoint = (label: string) => (entrypoint = label);
  const topicsDb = databases.find(
    (db) => "child_database" in db && db.child_database.title === "Topics"
  )?.id;
  const languagesDb = databases.find(
    (db) => "child_database" in db && db.child_database.title === "Languages"
  )?.id;
  const projectsDb = databases.find(
    (db) => "child_database" in db && db.child_database.title === "Projects"
  )?.id;
  const typewriterText = [
    "Data",
    "Knowledge",
    "Impact",
    "Research",
    "Tools",
    "Advocacy",
    "Communities",
  ];
</script>

<svelte:head>
  <title>osl hub</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="flex flex-col items-center min-h-screen">
  <div
    class="flex-col flex max-w-screen-2xl relative justify-center align-center items-center min-h-screen space-y-20 px-8 lg:flex-row lg:space-x-2"
  >
    <GradientHeading
      tag="h1"
      class="text-6xl text-left basis-9/12 md:text-8xl"
      direction="bg-gradient-to-r"
      from="from-accent-500"
      to="to-primary-500"
    >
      <Typewriter
        mode="loopRandom"
        element="span"
        class="inline-block"
        interval={25}
        unwriteInterval={25}
        cursor={false}
        wordInterval={3000}
      >
        {#each typewriterText as text}
          <h1 class="text-accent-500 inline-block text-6xl text-left md:text-8xl dark:text-accent-500 underline">{text}</h1>
        {/each}
      </Typewriter>
      <br />
      shouldn't have <br />dead ends.
    </GradientHeading>
    <div class="basis-3/12 p-4 bg-surface-100 dark:bg-surface-800 h-fit">
      <TabGroup selected={storeTab}>
        <Tab value="learning">
          <Icon
            icon="material-symbols:menu-book-outline-sharp"
            class="text-xl mr-1 inline-block"
          />
          Learning
        </Tab>
        <Tab value="sharing">
          <Icon icon="ic:baseline-share" class="text-xl mr-1 inline-block" />
          Sharing
        </Tab>
      </TabGroup>
      <div class="py-4">
        {#if $storeTab === "learning"}
          <p>
            Learning data science needs a
            <GradientHeading
              tag="span"
              direction="bg-gradient-to-r"
              from="from-primary-400"
              to="to-tertiary-400">network</GradientHeading
            >
            of information. Methods, programming languages, tools, and data are all
            interconnected.
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
        {#if $storeTab === "sharing"}
          <p>
            Your work
            <GradientHeading
              tag="span"
              direction="bg-gradient-to-r"
              from="from-accent-400"
              to="to-primary-400">counts.</GradientHeading
            > Share your data science methods, projects, tools, and learnings here
            on the hub and connect it to other entries. Helps others to learn and
            keep your work visible.
          </p>
          <a href="/share" class="my-4 btn-ringed-accent btn w-full"
            >Add your work</a
          >
        {/if}
      </div>
      <div class="absolute bottom-20" style="left:50%;transform:translateX(-50%);">
        <button class="btn flex flex-col" on:click={() => typeof window !== "undefined" && scrollTo(window.innerHeight + 62)}>
          <Icon icon="material-symbols:arrow-circle-down-rounded" class="text-4xl"/>
          (more down here...)
        </button>
      </div>
    </div>
  </div>
  <div
    id="second-section"
    class="flex-col flex justify-center align-center items-center space-y-2 w-full space-x-2 min-h-screen bg-neutral-100 dark:bg-neutral-800 md:p-8"
  >
    <div class="flex flex-col max-w-screen-2xl w-full m-auto items-center p-5 space-y-10 lg:flex-row lg:p-0">
		<div class="basis-1/2 lg:max-w-2xl lg:mr-20">
			<h3 class="text-6xl my-4">Connecting the dots</h3>
			<p class=" my-8">
				Learning about data science is a constellation of info. To start, all you need to do is choose an entry point. Each
				article is connected to related projects, tools, data science methods, and programming languages. Everything is connected,
				and pretty soon you'll have a good foundation to get started.
			</p>
			<Alert background="bg-secondary-500/25">
				<svelte:fragment slot="title">Looking for inspiration?</svelte:fragment>
				<span>
					Learn more about <a href="/page/98d23937-c09c-4059-87c8-000e7be1ca5b">TurfJS</a>, 
					an engine for spatial analysis in the browser. 
					<br/><br/>
					Or maybe learn more about
					<a href="/page/b6ccc858-6291-4f20-866f-2a84d21b19bf">spatial autocorrelation</a> -- 
					the way we measure how nearby things are often connected. 
					<br/><br/>
					Code hungry? Take a look at <a href="/page/b841f2d0-5741-4981-830c-97f5f60dbd74">Rust</a>, 
					a powerful and blazingly fast new(ish) programming language!
			</Alert>
		</div>
		<div class="w-full flex-1 basis-1/2 relative">
			<IllustrationSvg />
			<span class="w-full absolute left-0 top-0 h-full rounded-full dark:bg-gradient-to-r from-cyan-500/25 to-blue-500/25 blur-2xl z-0"></span>
		</div>
    </div>
  </div>
  <div
    class="text-left w-full p-8 items-start min-h-1/2 bg-accent-200 dark:bg-accent-700 flex flex-col justify-center align-center items-center"
  >
    <div class="max-w-screen-2xl w-full">
      <h3 class="text-8xl text-left my-8">Dive in</h3>
      <div class="relative">
        {#each databases as database}
          <Card href={`/db/${database.id}`}>
            {"child_database" in database ? database.child_database.title : ""}
          </Card>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  } */
</style>
