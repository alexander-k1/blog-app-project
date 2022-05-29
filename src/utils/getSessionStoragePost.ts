import { Post } from '../hooks/usePosts'

export default function getSessionStoragePost(postId: number) {
  const storageData = window.sessionStorage.getItem('__posts__')
  let data: Post[] | undefined = undefined
  if (storageData) {
    data = JSON.parse(storageData)
    if (data) {
      let post: Post | undefined
      post = data.find((post) => post.id === postId)
      return post
    } else {
      return null
    }
  } else {
    return null
  }
}
