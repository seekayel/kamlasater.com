<!-- _post.svelte -->
<script>
  export let title
  export let date
  export let tags;
</script>

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
