import React from 'react'
import findUser from './utils/findUser'

interface AuthContextInterface {
  user: User
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = React.createContext<
  AuthContextInterface | undefined
>(undefined)

export const useAuthContext = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be inside a Provider with a value')
  }

  return context
}

interface AppProps {
  children: React.ReactNode
}
type authState = 'logged-in' | 'logged-out'
interface User {
  username: string | null
  userId: string | null
}
export const AuthContextProvider = ({ children }: AppProps) => {
  const [user, setUser] = React.useState<User>({ username: null, userId: null })
  const [authState, setAuthState] = React.useState<authState>('logged-out')
  let loginTimeout: ReturnType<typeof setTimeout>
  let logoutTimeout: ReturnType<typeof setTimeout>

  const handleLogin = (username: string) => {
    window.sessionStorage.setItem('__authenticated_user__', username)
    window.sessionStorage.setItem('__token__', '0123456789')
    const user = findUser(username)
    if (user) {
      window.sessionStorage.setItem('__user_id__', JSON.stringify(user.userId))
    } else {
      window.sessionStorage.setItem(
        '__user_id__',
        JSON.stringify(new Date().getTime())
      )
    }
    setAuthState('logged-in')
  }
  const handleLogout = () => {
    window.sessionStorage.removeItem('__authenticated_user__')
    window.sessionStorage.removeItem('__token__')
    window.sessionStorage.removeItem('__user_id__')
    setAuthState('logged-out')
  }
  const login = (username: string) => {
    //timeout to simulate network delay
    loginTimeout = setTimeout(() => {
      handleLogin(username)
    }, 1000)
  }
  const logout = () => {
    //timeout to simulate network delay
    logoutTimeout = setTimeout(() => {
      handleLogout()
    }, 1000)
  }

  React.useEffect(() => {
    if (window.sessionStorage.getItem('__authenticated_user__')) {
      setAuthState('logged-in')
    }
    setUser({
      username: window.sessionStorage.getItem('__authenticated_user__'),
      userId: window.sessionStorage.getItem('__user_id__'),
    })
  }, [authState])
  React.useEffect(() => {
    return () => {
      if (loginTimeout) {
        clearTimeout(loginTimeout)
      }
      if (logoutTimeout) {
        clearTimeout(logoutTimeout)
      }
    }
  })

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
