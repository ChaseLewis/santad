import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// GitHub Pages repo name (change this to your repo name)
const base = process.env.NODE_ENV === 'production' ? '/santad' : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base
		},
		alias: {
			'$lib': './src/lib',
			'$lib/*': './src/lib/*'
		}
	}
};

export default config;
