<script lang="ts">
  import { menu } from "@skeletonlabs/skeleton";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";

  const isClient = typeof window !== "undefined";
  const isLoggedIn = Object.keys($page.data.session || {}).length;
  const email = $page?.data?.session?.user?.email;
  const name = $page?.data?.session?.user?.name || email;
  const image = $page?.data?.session?.user?.image;
  console.log(isClient ? $page : "")
</script>

{#if isLoggedIn}
  <span class="relative">
    <!-- Trigger: apply the 'use:menu' action and supply the unique menu ID -->
    <button use:menu={{ menu: "login", interactive: true }}>
      {#if image}
        <Avatar src={image} alt={`${name} avatar`} width="w-6" />
      {:else}
        <Avatar initials={name?.slice(0, 2)} />
      {/if}
    </button>

    <!-- Menu: set a matching 'data-menu-[menuId]' attribute -->
    <div data-menu="login" class="text-left bg-primary-500 py-2 px-3 rounded-md shadow-md dark:shadow-neutral-600">
      <p><b>{name}</b></p>
      <p><i>{email}</i></p>
      <a href="/auth/signout">Sign out</a>
    </div>
  </span>
{:else}
<!-- Prevent crawler from pre-rendering auth pages -->
  <a href={isClient? "/auth/signin" : "/"}>Sign In</a>
{/if}