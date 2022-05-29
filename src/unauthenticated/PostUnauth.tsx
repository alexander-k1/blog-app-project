import React from 'react'
import { useParams } from 'react-router-dom'
import PostDetailsUnauth from './PostDetailsUnauth'
import PostDetailsStorageUnauth from './PostDetailsStorageUnauth'
import styles from './post.module.scss'
function Post() {
  let { postId, userId } = useParams()
  if (Number(userId) < 11) {
    return (
      <div className={styles.post}>
        <PostDetailsUnauth postId={Number(postId)} userId={Number(userId)} />
      </div>
    )
  } else {
    return (
      <div className={styles.post}>
        <PostDetailsStorageUnauth
          postId={Number(postId)}
          userId={Number(userId)}
        />
      </div>
    )
  }
}

export default Post
