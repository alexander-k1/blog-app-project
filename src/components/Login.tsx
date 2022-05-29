import React from 'react'
import { useAuthContext } from '../auth-context'
import styles from './login.module.scss'

function Login() {
  const { login } = useAuthContext()
  const [loginSubmitted, setLoginSubmitted] = React.useState(false)
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }
    login(target.username.value)
    setLoginSubmitted(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h2 className={styles.loginTitle}>Log in</h2>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
          <label htmlFor='username' className={styles.loginLabel}>
            username
          </label>
          <input
            required
            type='text'
            name='username'
            id='username'
            placeholder='any username'
            className={styles.loginInput}
          />
          <label htmlFor='password' className={styles.loginLabel}>
            password
          </label>
          <input
            required
            type='password'
            name='password'
            id='password'
            placeholder='any password'
            className={styles.loginInput}
          />
          <button
            type='submit'
            className={styles.submitLogin}
            disabled={loginSubmitted ? true : false}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
