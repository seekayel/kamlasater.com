<!-- [tag].svelte -->
<script context="module">
export const load = async ({ params, fetch }) => {
    const currentTag = params.tag
    const response = await fetch('/api/posts.json')
    const posts = await response.json()

    const matchingPosts = posts.filter((p) => {
        return p.meta.tags.includes(currentTag)
    })

    return {
        props: {
            status: 200,
            posts: matchingPosts
        }
    }
}
</script>

<script>
    export let posts
</script>

<ul>
    {#each posts as post}
        <li>
            <h2>
                <a href={post.path}>
                    {post.meta.title}
                </a>
            </h2>
        </li>
    {/each}
</ul>
