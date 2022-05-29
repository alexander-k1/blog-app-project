import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useCreateComment from '../hooks/useCreateComment'
import styles from './leave-comment.module.scss'
function LeaveComment({ postId }: { postId: number }) {
  const createCommentMutation = useCreateComment()
  const navigate = useNavigate()
  const location = useLocation()
  const [nameValue, setNameValue] = React.useState('')
  const [commentBodyValue, setCommentBodyValue] = React.useState('')
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // const target = e.target as typeof e.target & {
    //   name: { value: string }
    //   commentbody: { value: string }
    // }
    const form = document.getElementById('commentForm') as HTMLFormElement
    createCommentMutation.mutate(
      {
        name: nameValue,
        body: commentBodyValue,
        id: new Date().getTime(),
        postId: postId,
      },
      {
        onSuccess: (data, variables, context) => {
          alert('Comment submitted!')
          setNameValue('')
          setCommentBodyValue('')
          form.reset()
          navigate(location)
        },
        onError: (error, variables, context) => {
          alert('An error occured. Please, try again.')
        },
      }
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h2 className={styles.leaveCommentTitle}>Leave a comment</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.leaveCommentForm}
          id='commentForm'
        >
          <label htmlFor='name' className={styles.inputLabel}>
            title
          </label>
          <input
            required
            type='text'
            name='name'
            id='name'
            className={styles.commentName}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <label htmlFor='commentbody' className={styles.inputLabel}>
            comment
          </label>
          <textarea
            required
            name='commentbody'
            id='commentbody'
            className={styles.commentBody}
            value={commentBodyValue}
            onChange={(e) => setCommentBodyValue(e.target.value)}
          />
          <button
            type='submit'
            disabled={createCommentMutation.isLoading}
            className={styles.submitComment}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default LeaveComment
