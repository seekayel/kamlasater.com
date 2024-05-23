<!-- _post.svelte -->

<script>
  import { MetaTags } from 'svelte-meta-tags';
  import { onMount } from 'svelte';

  let url = ``;

  onMount(() => url = window.location.href);

  export let title
  export let date
  export let tags
  export let description
</script>

<MetaTags
  title="{title}"
  titleTemplate="%s | kamlasater.com"
  description="{description}"
  canonical="{url}"
  openGraph={{
    url: 'https://kamlasater.com',
    title: `${title} | kamlasater.com`,
    description: description,
    // images: [
    //   {
    //     url: 'https://www.example.ie/og-image-01.jpg',
    //     width: 800,
    //     height: 600,
    //     alt: 'Og Image Alt',
    //   },
    //   {
    //     url: 'https://www.example.ie/og-image-02.jpg',
    //     width: 900,
    //     height: 800,
    //     alt: 'Og Image Alt Second',
    //   },
    //   { url: 'https://www.example.ie/og-image-03.jpg' },
    //   { url: 'https://www.example.ie/og-image-04.jpg' },
    // ],
    // site_name: 'SiteName',
  }}
  twitter={{
    handle: '@seekayel',
    // site: '@site',
    // cardType: 'summary_large_image',
    // title: 'Using More of Config',
    // description: 'This example uses more of the available config options.',
    // image: 'https://www.example.ie/twitter-image.jpg',
    // imageAlt: 'Twitter image alt',
  }}
/>

<h1>{title}</h1>

<p>Published: {date}</p>

{#if tags.length}
  <aside>
    <h2>Tagged:</h2>
    <ul>
      {#each tags as tag}
        <li>
          <a href="/blog/tags/{tag}">
            {tag}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<slot />
