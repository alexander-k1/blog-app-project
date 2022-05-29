import { useMutation, useQueryClient } from 'react-query'
import { useAuthContext } from '../auth-context'
import addToSessionStorage from '../utils/addToSessionStorage'
import addUserToSessionStorage from '../utils/addUserToSessionStorage'
import { Post } from './usePosts'
export default function useCreatePost() {
  const { user } = useAuthContext()
  const queryCache = useQueryClient()
  return useMutation(
    async (newPost) => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify(newPost),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Network error')
      }
      return response.json()
    },
    {
      onMutate: async (newPost: Post) => {
        await queryCache.cancelQueries(['posts'])

        const previousPosts = queryCache.getQueryData<Post[]>(['posts'])

        if (previousPosts) {
          queryCache.setQueryData<Post[]>(
            ['posts'],
            [...previousPosts, newPost]
          )
        }

        return { previousPosts }
      },
      onError: (error, values, context) => {
        if (context?.previousPosts) {
          queryCache.setQueryData<Post[]>(['posts'], context.previousPosts)
        }
      },
      onSuccess: (data, values, context) => {
        queryCache.invalidateQueries(['posts'])
        //add the new post to Session Storage, because it isn't really saved on the server
        addToSessionStorage(values, Number(user.userId!))
        //add the current user to Session Storage if it's their first post
        addUserToSessionStorage(user.username!, Number(user.userId!))
      },
    }
  )
}
