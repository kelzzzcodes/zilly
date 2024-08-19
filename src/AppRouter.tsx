import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Dashboard, Home, Register } from './_root/pages'
import SignIn from './_root/pages/SignIn'
import { ExclusiveRoute, RequireAuth } from './routes'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<ExclusiveRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter
