import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Briefcase, LogOut, User, Home, FileText } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="glass sticky top-0 z-40 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              JobPortal
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/jobs" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              <span className="font-medium">Jobs</span>
            </Link>

            {user ? (
              <>
                <Link 
                  to={`/${user.role}/dashboard`}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
