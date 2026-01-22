import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../../components/Loader'
import { Briefcase, FileText, CheckCircle, XCircle } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'
import toast from 'react-hot-toast'

const CandidateDashboard = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get('/applications/my-applications')
      setApplications(data.applications || data)
    } catch (error) {
      toast.error('Failed to fetch applications')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  const stats = [
    { label: 'Total Applications', value: applications.length, icon: FileText, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, icon: Briefcase, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, icon: CheckCircle, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, icon: XCircle, bgColor: 'bg-red-100', iconColor: 'text-red-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Track your job applications and find new opportunities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card p-6">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/jobs" className="card p-6 hover:scale-[1.02] transition-transform">
          <Briefcase className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Jobs</h3>
          <p className="text-gray-600">Find your next opportunity</p>
        </Link>
        <Link to="/candidate/profile" className="card p-6 hover:scale-[1.02] transition-transform">
          <FileText className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Update Profile</h3>
          <p className="text-gray-600">Keep your information current</p>
        </Link>
      </div>

      {/* Recent Applications */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't applied to any jobs yet</p>
            <Link to="/jobs" className="btn-primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app._id} application={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const ApplicationCard = ({ application }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{application.job?.title}</h3>
          <p className="text-gray-600">{application.job?.company}</p>
          <p className="text-sm text-gray-500 mt-2">Applied on {formatDate(application.appliedAt)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
          {application.status}
        </span>
      </div>
    </div>
  )
}

export default CandidateDashboard
