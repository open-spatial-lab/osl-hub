import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
// import Google from "@auth/core/providers/google";
// import Facebook from "@auth/core/providers/facebook";
import type { Provider } from "@auth/core/providers";
import type { Profile } from "@auth/core/types";

// @ts-ignore
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET } from "$env/static/private";

// WORKAROUND FOR BROKEN SVGS
function Google(options: any) {
  return {
    id: "google",
    name: "Google",
    type: "oidc",
    issuer: "https://accounts.google.com",
    style: {
      logo: "https://authjs.dev/img/providers/google.svg",
      logoDark: "https://authjs.dev/img/providers/google.svg",
      bgDark: "#fff",
      bg: "#fff",
      text: "#000",
      textDark: "#000",
    },
    options,
  };
}

function Facebook(options: any) {
  return {
    id: "facebook",
    name: "Facebook",
    type: "oauth",
    authorization: "https://www.facebook.com/v15.0/dialog/oauth?scope=email",
    token: "https://graph.facebook.com/oauth/access_token",
    userinfo: {
      // https://developers.facebook.com/docs/graph-api/reference/user/#fields
      url: "https://graph.facebook.com/me?fields=id,name,email,picture",
      async request({ tokens, provider }) {
        return await fetch(provider.userinfo?.url, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        }).then(async (res) => await res.json());
      },
    },
    profile(profile: any) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture.data.url,
      };
    },
    style: {
      logo: "https://authjs.dev/img/providers/facebook.svg",
      logoDark: "https://authjs.dev/img/providers/facebook-dark.svg",
      bg: "#fff",
      text: "#006aff",
      bgDark: "#006aff",
      textDark: "#fff",
    },
    options,
  };
}

let providers: Array<Provider<Profile>> = [];

const providerInfo: Array<{
  clientId: string;
  clientSecret: string;
  provider: Function;
}> = [
  // {
  //   clientId: GITHUB_ID,
  //   clientSecret: GITHUB_SECRET,
  //   provider: GitHub
  // },
  {
    clientId: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    provider: Google,
  },
  {
    clientId: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    provider: Facebook,
  },
];

providerInfo.forEach(({ provider, clientId, clientSecret }) => {
  if (clientId && clientSecret) {
    providers.push(provider({ clientId, clientSecret }));
  }
});

export const handle = SvelteKitAuth({
  trustHost: true,
  providers,
});
