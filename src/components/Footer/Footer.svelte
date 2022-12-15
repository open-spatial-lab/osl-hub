<script lang="ts">
  import type { FooterColumn } from "./types";
  import dsiLogo from "$lib/images/dsi.png";
  import dsiLogoDark from "$lib/images/dsiDark.png";
  import csdsLogo from "$lib/images/csds.png";
  import csdsLogoDark from "$lib/images/csdsDark.png";
  import rwjfLogo from "$lib/images/rwjf.jpg";
  import cx from "classnames";
  const NavColumn: FooterColumn = [
    {
      header: "Open Spatial Lab Hub",
    },
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Contact",
      link: "/contact",
    },
    {
      text: "Github",
      link: "https://github.com/open-spatial-lab",
    },
  ];
  const UChicagoColumn: FooterColumn = [
    {
      header: "University of Chicago",
    },
    {
      link: "https://datascience.uchicago.edu/",
      image: dsiLogo,
      text: "The Data Sceince Institute",
      class: "block dark:hidden"
    },
    {
      image: csdsLogo,
      text: "The Center for Spatial Data Science",
      link: "https://spatial.uchicago.edu/",
      class: "block dark:hidden"
    },
    {
      link: "https://datascience.uchicago.edu/",
      image: dsiLogoDark,
      text: "The Data Sceince Institute",
      class: "hidden dark:block"
    },
    {
      image: csdsLogoDark,
      text: "The Center for Spatial Data Science",
      link: "https://spatial.uchicago.edu/",
      class: "hidden dark:block"
    },
  ];
  const AcknowledgementsColumn: FooterColumn = [
    {
      header: "Acknowledgements",
    },
    {
      image: rwjfLogo,
      text: "The Robert Wood Johnson Foundation",
      link: "https://www.rwjf.org/",
    },
    {
      text: "Support for the Open Spatial Lab is provided in part by the Robert Wood Johnson Foundation",
      link: "https://www.rwjf.org/",
    },
  ];
  const FooterContent: Array<FooterColumn> = [
    NavColumn,
    UChicagoColumn,
    AcknowledgementsColumn,
  ];
</script>

<footer class=" bg-slate-50 dark:bg-slate-800 py-5">
  <div class="grid grid-cols-1 max-w-screen-2xl m-auto md:grid-cols-3 md:text-center">
    {#each FooterContent as FooterColumn}
      <ul class="list">
        {#each FooterColumn as Entry}
          <li class={cx("w-full", Entry.class)}>
            {#if Entry.header}
              <h5>{Entry.header}</h5>
            {:else if Entry.image}
              <a href={Entry.link} class="py-2">
                <img
                  src={Entry.image}
                  alt={Entry.text}
                  class="footer-image d-block mx-auto d-md-inline"
                />
              </a>
            {:else}
              <a href={Entry.link}>{Entry.text}</a>
            {/if}
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</footer>

<style>
  .footer-image {
    max-width: 100%;
    max-height: 125px;
  }
</style>
