import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useAuthContext } from '../auth-context'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import AfterLogin from './AfterLogin'
import styles from './authenticated-app.module.scss'
import NewPost from './NewPost'
import Post from './Post'

const queryClient = new QueryClient()

function AuthenticatedApp() {
  const { logout } = useAuthContext()

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className={styles.appHeader}>
            <Navbar>
              <Link to='newpost'>new post</Link>
              <div role='link' onClick={logout}>
                log out
              </div>
            </Navbar>
          </header>
          <Routes>
            <Route path='/' element={<UserList />}></Route>
            <Route path='newpost' element={<NewPost />}></Route>
            <Route path='post/:userId/:postId' element={<Post />}></Route>
            <Route path='login' element={<AfterLogin />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

export default AuthenticatedApp
