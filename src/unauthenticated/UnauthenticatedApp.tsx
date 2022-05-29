import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import PostUnauth from './PostUnauth'
import styles from './unauthenticated-app.module.scss'

const queryClient = new QueryClient()

function UnauthenticatedApp() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className={styles.appHeader}>
            <Navbar>
              <Link to='/login'>log in</Link>
            </Navbar>
          </header>
          <Routes>
            <Route path='/' element={<UserList />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='post/:userId/:postId' element={<PostUnauth />}></Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

export default UnauthenticatedApp
