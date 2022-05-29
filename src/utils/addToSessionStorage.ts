import { Post } from '../hooks/usePosts'

export default function addToSessionStorage(newPost: Post, userId: number) {
  let storagePosts = window.sessionStorage.getItem('__posts__')
  if (storagePosts) {
    let parsedStorageposts = JSON.parse(storagePosts)
    let newPosts = [
      ...parsedStorageposts,
      {
        title: newPost.title,
        body: newPost.body,
        id: new Date().getTime(),
        userId: userId,
      },
    ]
    window.sessionStorage.setItem('__posts__', JSON.stringify(newPosts))
  } else {
    window.sessionStorage.setItem(
      '__posts__',
      JSON.stringify([
        {
          title: newPost.title,
          body: newPost.body,
          id: new Date().getTime(),
          userId: userId,
        },
      ])
    )
  }
}
