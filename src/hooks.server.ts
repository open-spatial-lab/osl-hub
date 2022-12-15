import SvelteKitAuth from "@auth/sveltekit"
import GitHub from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
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
    GoogleProvider({
      clientId: SECRET_GOOGLE_CLIENT_ID,
      clientSecret: SECRET_GOOGLE_CLIENT_SECRET
    })
  ],
})