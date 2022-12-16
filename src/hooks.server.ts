
import SvelteKitAuth from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { SECRET_GITHUB_CLIENT_ID, SECRET_GITHUB_CLIENT_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
  trustHost: true,
  providers: [GitHub({ clientId: SECRET_GITHUB_CLIENT_ID, clientSecret: SECRET_GITHUB_CLIENT_SECRET })],
})
