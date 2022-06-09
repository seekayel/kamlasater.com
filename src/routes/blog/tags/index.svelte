<!-- src/routes/blog/tags/index.svelte -->
<script context="module">


export const load = async ({ fetch }) => {
// console.log('loaded /blog/tags/index.svelte')
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()

    const tagData = allPosts.reduce((result, cur) => {
        cur.meta.tags.forEach((t) => {
            if (!result[t]) {
                result[t] = {name: t, count: 0, posts: []}
            }
            result[t].count = result[t].count + 1
            result[t].posts.push(cur.path)
        })
        return result
    }, {})

    // console.log(`returning ${JSON.stringify(tagData)}`)
    return {
        props: {
            tags: tagData
        }
    }
}
</script>

<script>
    export let tags
    // console.log(tags)
</script>

<ul>
    {#each Object.entries(tags) as [tag, data]}
        <li>
            <h2>
                <a href="/blog/tags/{tag}">
                    {tag} ({data.count})
                </a>
            </h2>
        </li>
    {/each}
</ul>
