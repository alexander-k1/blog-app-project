import { useQuery } from 'react-query'

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

async function fetchPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  )

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function usePosts(userId: number) {
  return useQuery(['posts', 'users', userId], () => fetchPosts(userId))
}
