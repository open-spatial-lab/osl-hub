import {SvelteKitAuth} from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import type { Provider } from "@auth/core/providers";
import type { Profile } from "@auth/core/types";

// @ts-ignore
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET  } from "$env/static/private";

let providers: Array<Provider<Profile>> = []

const providerInfo: Array<{clientId: string, clientSecret: string, provider: Function}> = [
  // {
  //   clientId: GITHUB_ID,
  //   clientSecret: GITHUB_SECRET,
  //   provider: GitHub
  // },
  {
    clientId: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    provider: Google
  },
  {
    clientId: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    provider: Facebook
  }
]

providerInfo.forEach(({provider, clientId, clientSecret}) => {
  if (clientId && clientSecret) {
    providers.push(provider({clientId, clientSecret}))
  }
})

export const handle = SvelteKitAuth({
  trustHost: true,
  providers
});
