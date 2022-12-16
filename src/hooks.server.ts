import SvelteKitAuth from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import { 
  SECRET_GITHUB_CLIENT_ID,
  SECRET_GITHUB_CLIENT_SECRET,
  SECRET_GOOGLE_CLIENT_ID,
  SECRET_GOOGLE_CLIENT_SECRET,
} from "$env/static/private"

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ 
      clientId: SECRET_GITHUB_CLIENT_ID,
      clientSecret: SECRET_GITHUB_CLIENT_SECRET
    }),
    // Google({
    //   clientId: SECRET_GOOGLE_CLIENT_ID,
    //   clientSecret: SECRET_GOOGLE_CLIENT_SECRET
    // })
  ],
})