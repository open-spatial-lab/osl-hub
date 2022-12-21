import { sveltekit } from "@sveltejs/kit/vite"
import path from "path"

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '$components': path.resolve("./src/components"),
      '$components/*': path.resolve("./src/components/*"),
      '$lib': path.resolve("./src/lib"),
      '$lib/*': path.resolve("./src/lib/*"),
      '$types': path.resolve("./src/types"),
      '$types/*': path.resolve("./src/types/*"),
    }
  }
}

export default config