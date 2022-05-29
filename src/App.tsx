import React from 'react'
import { useAuthContext } from './auth-context'
import FullPageLoading from './components/FullPageLoading'

const AuthenticatedApp = React.lazy(
  () => import('./authenticated/AuthenticatedApp')
)
const UnauthenticatedApp = React.lazy(
  () => import('./unauthenticated/UnauthenticatedApp')
)

function App() {
  const { user } = useAuthContext()

  return (
    <React.Suspense fallback={<FullPageLoading />}>
      {user.username ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
