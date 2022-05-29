import React from 'react'
import getSessionStorageUsers from '../utils/getSessionStorageUsers'
import getSessionStoragePost from '../utils/getSessionStoragePost'
import getSessionStorageComments from '../utils/getSessionStorageComments'
import { Comment } from '../hooks/useComments'
import LeaveComment from './LeaveComment'
import styles from './post-details.module.scss'

function PostDetailsStorage({
  postId,
  userId,
}: {
  postId: number
  userId: number
}) {
  const users = getSessionStorageUsers()
  let userData = users?.find((user) => user.id === userId)
  const postData = getSessionStoragePost(postId)
  if (!userData || !postData) {
    return (
      <div className={styles.error}>
        <p>Sorry, data unavailable</p>
      </div>
    )
  }
  let commentsData: Comment[] = []
  const storageComments = getSessionStorageComments(postId)
  if (storageComments) {
    commentsData = [...storageComments]
  }
  return (
    <main className={styles.postWrapper}>
      <section className={styles.post}>
        <h4 className={styles.title}>{postData.title}</h4>
        <h3 className={styles.author}>by {userData.username}</h3>
        <p className={styles.postText}>{postData.body}</p>
      </section>
      <section className={styles.leaveComment}>
        <LeaveComment postId={postId} />
      </section>
      <section className={styles.comments}>
        {commentsData.length < 1 ? (
          <p className={styles.commentsAlert}>No comments yet</p>
        ) : null}
        {commentsData.length >= 1 ? (
          <ul className={styles.commentList}>
            {commentsData.map((comment) => {
              return (
                <li className={styles.comment} key={comment.id}>
                  <p className={styles.commentName}>{comment.name}</p>
                  <p className={styles.commentBody}>{comment.body}</p>
                </li>
              )
            })}
          </ul>
        ) : null}
      </section>
    </main>
  )
}

export default PostDetailsStorage
