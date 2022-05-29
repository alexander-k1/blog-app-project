import React from 'react'
import { CgCloseR } from 'react-icons/cg'
import useUsers from '../hooks/useUsers'
import getSessionStorageUsers from '../utils/getSessionStorageUsers'
import Loading from './Loading'
import PostList from './PostList'
import PostListStorage from './PostListStorage'
import styles from './user-list.module.scss'

function UserList() {
  const { data, isLoading, error } = useUsers()
  const [currentUser, setCurrentUser] = React.useState({ id: -1, username: '' })

  function handleClick(id: number, username: string) {
    setCurrentUser({ id, username })
  }
  if (isLoading) {
    return (
      <div className={styles.loading}>
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
  const storageUsers: { username: string; id: number }[] | null =
    getSessionStorageUsers()
  let combinedUsers: { username: string; id: number }[] | undefined = []
  let usersFromData = data.map((user) => {
    return { username: user.username, id: user.id }
  })
  if (storageUsers) {
    combinedUsers = [...usersFromData, ...storageUsers]
  } else {
    combinedUsers = [...usersFromData]
  }

  return (
    <main className={styles.wrapper}>
      <section
        className={
          currentUser.id > -1
            ? `${styles.users} ${styles.moveLeft}`
            : styles.users
        }
      >
        <h3 className={styles.title}>Authors</h3>
        <ul className={styles.userList}>
          {combinedUsers.map((item) => {
            return (
              <li key={item.id}>
                <article
                  className={
                    currentUser.id === item.id
                      ? `${styles.user} ${styles.selectedUser}`
                      : styles.user
                  }
                  onClick={() => handleClick(item.id, item.username)}
                  data-cy={`user-${item.id}`}
                >
                  {item.username}
                </article>
              </li>
            )
          })}
        </ul>
      </section>
      <section
        className={
          currentUser.id > -1
            ? `${styles.postList} ${styles.visible}`
            : styles.postList
        }
      >
        {currentUser.id > -1 ? (
          <>
            <CgCloseR
              className={styles.closeBtn}
              onClick={() => setCurrentUser({ id: -1, username: '' })}
            />
            <h3 className={styles.title}>{currentUser.username}'s posts</h3>
            {currentUser.id < 11 ? (
              <PostList userId={currentUser.id} />
            ) : (
              //for posts from sessionStorage
              <PostListStorage userId={currentUser.id} />
            )}
          </>
        ) : null}
      </section>
    </main>
  )
}

export default UserList
