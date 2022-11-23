import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert'
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	ssr: { noExternal: ['@popperjs/core'] },
	optimizeDeps: {
		entries: []
	}
};

export default config;