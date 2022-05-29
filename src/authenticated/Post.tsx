import React from 'react'
import { useParams } from 'react-router-dom'
import PostDetails from '../components/PostDetails'
import PostDetailsStorage from '../components/PostDetailsStorage'
import styles from './post.module.scss'
function Post() {
  let { postId, userId } = useParams()
  if (Number(userId) < 11) {
    return (
      <div className={styles.post}>
        <PostDetails postId={Number(postId)} userId={Number(userId)} />
      </div>
    )
  } else {
    return (
      <div className={styles.post}>
        <PostDetailsStorage postId={Number(postId)} userId={Number(userId)} />
      </div>
    )
  }
}

export default Post
