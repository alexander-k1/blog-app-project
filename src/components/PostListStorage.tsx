import React from 'react'
import styles from './post-list.module.scss'
import { Link } from 'react-router-dom'
import { Post } from '../hooks/usePosts'

function PostListStorage({ userId }: { userId: number }) {
  const storageData = window.sessionStorage.getItem('__posts__')
  let data: Post[] | undefined = undefined
  if (storageData) {
    data = JSON.parse(storageData)
    if (data) {
      data = data.filter((post) => post.userId === userId)
    }
  }

  if (!data) {
    return (
      <div className={styles.error}>
        <p>Sorry, nothing has been found</p>
      </div>
    )
  }
  return (
    <div className={styles.postTitles}>
      <ul>
        {data.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/post/${userId}/${post.id}`} className={styles.title}>
                {post.title.length > 35
                  ? `${post.title.slice(0, 35)}...`
                  : post.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostListStorage
