import React from 'react'
import { Link } from 'react-router-dom'
import { navbarLinks } from '../constants'

const Navbar = () => {
  return <nav className="bg-gray-300 px-6 py-8 flex items-center justify-between">
<Link to={'/'}>
Logo
</Link>
<div className='flex gap-16 flex-1 justify-center'>
{
  navbarLinks.map((item) => (
  <Link to={item.route} key={item.label}>
  {item.label}
    </Link>
  ))
}
</div>
<Link to={'/signIn'} className='mr-20 px-4 py-2 bg-blue-600 rounded-md text-white text-lg font-bold'>
  Sign In
</Link>
  </nav>
}

export default Navbar
