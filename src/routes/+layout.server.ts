import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
  console.log("layout server load", await locals.getSession())
  return {
    session: await locals.getSession(),
  }
}