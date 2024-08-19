import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'


const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-300 ">
      <Navbar/>
      <Outlet  />

    </div>
  )
}

export default RootLayout
