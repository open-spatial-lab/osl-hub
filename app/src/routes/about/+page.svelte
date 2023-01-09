<script lang="ts">
  import { GradientHeading } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
  <title>osl hub: about</title>
  <meta
    name="description"
    content="About the osl hub, a never-end resource hub"
  />
</svelte:head>
<div
  class="max-w-screen-2xl m-auto flex flex-col items-start p:8 space-y-8 lg:p-0"
>
  <GradientHeading
    tag="h1"
    class="text-8xl"
    direction="bg-gradient-to-r"
    from="from-primary-500"
    to="to-accent-500"
  >
    About the osl hub
  </GradientHeading>
  <p>
    The osl hub is a living, growing archive of data science tools, projects,
    topics, and other resources. It's aim is to make it easier to discover
    relevant tools and explore the network of related things to help you on your
    way, and provide a second life for the excellent work that sooner or later
    loses connections to new discourse.
  </p>
  <p>
    The open spatial hub is maintained by the Open Spatial Lab at the University
    of Chicago.
  </p>
  <h3>How to contribute</h3>
  <p>There are two ways to contribute to the osl hub:</p>
  <ol>
    <li>
      First, on the bottom of each page, there is a link to add comments
      directly to that article. By signing in with a Notion account or linked
      social provider, you can add comments directly to the article which hub
      moderators will review.
    </li>
    <li>
      If you're interested in directly contributing to the hub, email
      openspatial [at] uchicago [dot] edu with the title "Hub Contributor
      Request" and give us a brief description of how you'd like to get
      involved. For instance, if you have an idea for a particular entry or
      article, or if you'd like to contribute to moderating a topic like "Tools"
      or "Methods" more broadly.
    </li>
  </ol>
  <h3>About Open Spatial Lab</h3>
  <p>
    The Open Spatial Lab at the University of Chicago Data Science Institute
    creates open source data tools and analytics to solve problems using
    geospatial data science. The mission of the Open Spatial Lab (OSL) is to
    diversify perspectives included in spatial data science practice and reach a
    broad audience through more accessible tools for data exploration,
    management, and visualization. The Lab works with community partners local
    and across the US to understand needs and uses to activate data for
    community and policy decision support. Support is provided in part by the
    Robert Wood Johnson Foundation.
  </p>
</div>
