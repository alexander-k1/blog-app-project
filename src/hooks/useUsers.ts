import { useQuery } from 'react-query'

export interface User {
  id: number
  name?: string
  username: string
  email?: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone?: string
  website?: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function useUsers() {
  return useQuery(['users'], () => fetchUsers())
}
