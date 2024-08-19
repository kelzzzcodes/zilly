import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Dashboard, Home, Register } from './_root/pages'
import SignIn from './_root/pages/SignIn'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
