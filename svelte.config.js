import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import { searchForWorkspaceRoot } from 'vite'

import remarkToc from 'remark-toc'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({ out: 'dist' }),
    vite: {
      server: {
        fs: {
          allow: [
            searchForWorkspaceRoot(process.cwd())
          ]
        }
      }
    }
	},
  files: {
    assets: 'static'
  },
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: 'src/routes/blog/_post.svelte'
      },
      remarkPlugins: [
        [remarkToc, {
          heading: '.* contents|contents|toc|table[ -]of[ -]contents?',
          ordered: true
        }]
      ]
    }),
    sveltePreprocess()
  ],
};

export default config;
