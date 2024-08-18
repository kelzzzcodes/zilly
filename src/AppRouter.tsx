import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Home, Register } from './_root/pages'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
