import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({ out: 'dist' })
	},
  files: {
    assets: 'static'
  },
  preprocess: [
    mdsvex({
      extensions: ['.md']
    }),
    sveltePreprocess()
  ],
};

export default config;
