import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../auth-context'
import useCreatePost from '../hooks/useCreatePost'
import styles from './new-post.module.scss'
function NewPost() {
  const createPostMutation = useCreatePost()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [titleValue, setTitleValue] = React.useState('')
  const [postBodyValue, setPostBodyValue] = React.useState('')
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // const target = e.target as typeof e.target & {
    //   title: { value: string }
    //   postbody: { value: string }
    // }

    createPostMutation.mutate(
      {
        title: titleValue,
        body: postBodyValue,
        id: new Date().getTime(),
        userId: Number(user.userId!),
      },
      {
        onSuccess: (data, variables, context) => {
          alert('Post submitted!')
          setTitleValue('')
          setPostBodyValue('')
          navigate('/')
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
        <h2 className={styles.newPostTitle}>New post</h2>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.newPostForm}>
          <label htmlFor='title' className={styles.inputLabel}>
            title
          </label>
          <input
            required
            type='text'
            name='title'
            id='title'
            className={styles.postTitle}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <label htmlFor='postbody' className={styles.inputLabel}>
            post
          </label>
          <textarea
            required
            name='postbody'
            id='postbody'
            className={styles.postBody}
            value={postBodyValue}
            onChange={(e) => setPostBodyValue(e.target.value)}
          />
          <button
            type='submit'
            disabled={createPostMutation.isLoading}
            className={styles.submitPost}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPost
