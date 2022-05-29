import { useQuery } from 'react-query'
import { User } from './useUsers'

async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function useUser(userId: number) {
  return useQuery(['users', userId], () => fetchUser(userId))
}
