import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
  const currentUser = localStorage.getItem('userEmail')
  const isAuthenticated = !!currentUser
  const location = useLocation()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default RequireAuth
