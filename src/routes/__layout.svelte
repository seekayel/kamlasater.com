<!-- __layout.svelte -->
<!-- <svelte:head>
  <link href="themes/prism-vsc-dark-plus.css" rel="stylesheet" />
</svelte:head> -->

<script>
  import Header from '$lib/components/Header.svelte'
  import '$lib/styles/style.scss'
</script>

<Header />

<main>
  <slot />
</main>

<!-- <footer>Hello, I'm the footer.</footer> -->
