// posts.json.js
export const get = async () => {

  const allPostFiles = import.meta.glob('../blog/*.md')
  const iterPostFiles = Object.entries(allPostFiles)

  const allPosts = await Promise.all(
    iterPostFiles.map(async ([rawPath, resolver]) => {
      const {metadata} = await resolver()
      const path = rawPath.slice(2, -3)
      return {meta: metadata, path}
    })
  )


  const sortedPosts = allPosts.sort((a,b) => {
    return new Date(b.meta.date) - new Date(a.meta.date)
  })

  return {
    status: 200,
    body: sortedPosts
  }
}
