import { Comment } from '../hooks/useComments'
export default function addCommentsToSessionStorage(comment: Comment) {
  let storageComments = window.sessionStorage.getItem('__comments__')
  if (storageComments) {
    let parsedStorageComments = JSON.parse(storageComments)
    let newComments = [...parsedStorageComments, comment]
    window.sessionStorage.setItem('__comments__', JSON.stringify(newComments))
  } else {
    window.sessionStorage.setItem('__comments__', JSON.stringify([comment]))
  }
}
