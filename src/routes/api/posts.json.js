// posts.json.js
export const get = async () => {

  const allPostFiles = import.meta.glob('../blog/*.md')
  const iterPostFiles = Object.entries(allPostFiles)

  const allPosts = await Promise.all(
    iterPostFiles.map(async ([path, resolver]) => {
      const {metadata} = await resolver()
      const post = path.slice(2, -3)
      return {metadata, post}
    })
  )

  const sortedPosts = allPosts.sort((a,b) => {
    return new Date(b.metadata.date) - new Date(a.metadata.date)
  })

  return {
    status: 200,
    body: sortedPosts
  }
}
