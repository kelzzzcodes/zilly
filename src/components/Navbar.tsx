import { Link, useNavigate } from 'react-router-dom'
import { navbarLinks } from '../constants'

const Navbar = () => {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    navigate('/signIn')
  }

  return (
    <nav className="bg-gray-300 px-6 py-8 flex items-center justify-between">
      <Link to={'/'}>Logo</Link>
      <div className="hidden md:flex gap-16 flex-1 justify-center">
        {navbarLinks.map((item) => (
          <Link to={item.route} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>

      {userEmail ? (
        <div className="flex items-center gap-2">
          <Link
            className="px-4 py-2 bg-black rounded-md text-white text-lg font-bold"
            to={'/dashboard'}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="md:mr-20 px-4 py-2 bg-red-600 rounded-md text-white text-lg font-bold"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to={'/signIn'}
          className="md:mr-20 px-4 py-2 bg-blue-600 rounded-md text-white text-lg font-bold"
        >
          Sign In
        </Link>
      )}
    </nav>
  )
}

export default Navbar
