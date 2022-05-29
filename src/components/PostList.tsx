import React from 'react'
import usePosts from '../hooks/usePosts'
import Loading from './Loading'
import styles from './post-list.module.scss'
import { Link } from 'react-router-dom'

function PostList({ userId }: { userId: number }) {
  const { data, isLoading, error } = usePosts(userId)
  if (isLoading) {
    return (
      <div className={styles.listLoading}>
        <Loading />
      </div>
    )
  }
  if (error || !data) {
    return (
      <div className={styles.error}>
        <p>An error has occurred. Please, try again later</p>
      </div>
    )
  }
  return (
    <div className={styles.postTitles}>
      <ul>
        {data.map((post) => {
          return (
            <li key={post.id}>
              <Link
                to={`/post/${userId}/${post.id}`}
                className={styles.title}
                data-cy={`post-${post.id}`}
              >
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

export default PostList
