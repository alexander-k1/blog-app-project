import { useMutation, useQueryClient } from 'react-query'
import addCommentToSessionStorage from '../utils/addCommentToSessionStorage'
import { Comment } from './useComments'
export default function useCreatePost() {
  const queryCache = useQueryClient()
  return useMutation(
    async (newComment) => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments',
        {
          method: 'POST',
          body: JSON.stringify(newComment),
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
      onMutate: async (newComment: Comment) => {
        await queryCache.cancelQueries(['comments'])

        const previousComments = queryCache.getQueryData<Comment[]>([
          'comments',
        ])

        if (previousComments) {
          queryCache.setQueryData<Comment[]>(
            ['comments'],
            [...previousComments, newComment]
          )
        }

        return { previousComments }
      },
      onError: (error, values, context) => {
        if (context?.previousComments) {
          queryCache.setQueryData<Comment[]>(
            ['comments'],
            context.previousComments
          )
        }
      },
      onSuccess: (data, values, context) => {
        queryCache.invalidateQueries(['comments'])
        //add the new comment to Session Storage, because it isn't really saved on the server
        addCommentToSessionStorage(values)
      },
    }
  )
}
