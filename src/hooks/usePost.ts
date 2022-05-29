import { useQuery } from 'react-query'
import { Post } from './usePosts'

async function fetchPost(postId: number): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function usePost(postId: number) {
  return useQuery(['posts', postId], () => fetchPost(postId))
}
