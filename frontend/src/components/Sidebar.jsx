import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Briefcase, PlusCircle, Users } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const links = [
    { to: '/recruiter/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recruiter/jobs', icon: Briefcase, label: 'My Jobs' },
    { to: '/recruiter/job/create', icon: PlusCircle, label: 'Create Job' },
  ]

  return (
    <aside className="w-64 glass min-h-[calc(100vh-4rem)] p-6 border-r border-gray-200/50">
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
