import { Navigate, Outlet } from 'react-router-dom'

const ExclusiveRoute = () => {
  const currentUser = localStorage.getItem('userEmail')
  const isAuthenticated = !!currentUser

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default ExclusiveRoute
