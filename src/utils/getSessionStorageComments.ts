import { Comment } from '../hooks/useComments'
export default function getSessionStorageComments(postId: number) {
  let storageComments = window.sessionStorage.getItem('__comments__')
  let parsedComments: Comment[] | undefined = undefined
  if (storageComments) {
    parsedComments = JSON.parse(storageComments)
    return parsedComments?.filter((comment) => comment.postId === postId)
  } else {
    return null
  }
}
