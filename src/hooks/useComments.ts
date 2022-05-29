import { useQuery } from 'react-query'

export interface Comment {
  postId: number
  id: number
  name: string
  email?: string
  body: string
}

async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  )

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function useComments(postId: number) {
  return useQuery(['comments', 'posts', postId], () => fetchComments(postId))
}
