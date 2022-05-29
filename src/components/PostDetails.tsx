import React from 'react'
import useComments from '../hooks/useComments'
import usePost from '../hooks/usePost'
import useUser from '../hooks/useUser'
import getSessionStorageComments from '../utils/getSessionStorageComments'
import Loading from './Loading'
import styles from './post-details.module.scss'
import { Comment } from '../hooks/useComments'
import LeaveComment from './LeaveComment'

function PostDetails({ postId, userId }: { postId: number; userId: number }) {
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useUser(userId)
  const {
    data: postData,
    isLoading: postIsLoading,
    error: postError,
  } = usePost(postId)
  const {
    data,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useComments(postId)

  if (userIsLoading || postIsLoading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    )
  }
  if (userError || postError || !userData || !postData) {
    return (
      <div className={styles.error}>
        <p>An error has occurred. Please, try again later</p>
      </div>
    )
  }
  const storageComments = getSessionStorageComments(postId)
  let commentsData: Comment[] = []
  if (storageComments && data) {
    commentsData = [...data, ...storageComments]
  } else if (data) {
    commentsData = [...data]
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
        {commentsIsLoading ? (
          <p className={styles.commentsAlert}>Loading comments...</p>
        ) : null}
        {commentsError ? (
          <p className={styles.commentsAlert}>Could not load comments</p>
        ) : null}
        {!commentsIsLoading && !commentsError && commentsData.length < 1 ? (
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

export default PostDetails
