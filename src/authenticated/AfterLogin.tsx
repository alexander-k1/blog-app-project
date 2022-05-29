import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function AfterLogin() {
  const navigate = useNavigate()
  const location = useLocation() as {
    state: {
      from: Location
    }
  }
  React.useEffect(() => {
    const from = location.state?.from || '/'
    navigate(from, { replace: true })
  }, [location.state?.from, navigate])
  return null
}

export default AfterLogin
