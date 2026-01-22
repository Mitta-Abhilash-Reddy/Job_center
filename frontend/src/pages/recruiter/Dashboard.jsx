import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import Sidebar from '../../components/Sidebar'
import Loader from '../../components/Loader'
import { Briefcase, Users, Eye, PlusCircle } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'
import toast from 'react-hot-toast'

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyJobs()
  }, [])

  const fetchMyJobs = async () => {
    try {
      const { data } = await axiosInstance.get('/jobs?createdBy=me')
      setJobs(data.jobs || data)
    } catch (error) {
      toast.error('Failed to fetch jobs')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  const totalApplications = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0)

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and applicants</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Active Jobs</p>
            <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
          </div>
          <div className="card p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
          </div>
          <div className="card p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Views</p>
            <p className="text-3xl font-bold text-gray-900">-</p>
          </div>
        </div>

        {/* Quick Action */}
        <Link to="/recruiter/job/create" className="card p-6 mb-8 hover:scale-[1.02] transition-transform block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Post a New Job</h3>
              <p className="text-gray-600">Create a new job posting to attract talent</p>
            </div>
          </div>
        </Link>

        {/* Jobs List */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Job Postings</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
              <Link to="/recruiter/job/create" className="btn-primary">
                Create Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600 mb-2">{job.location} • {job.type}</p>
          <p className="text-sm text-gray-500">Posted on {formatDate(job.createdAt)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{job.applicants?.length || 0}</p>
            <p className="text-sm text-gray-600">Applicants</p>
          </div>
          <Link
            to={`/recruiter/job/${job._id}/applicants`}
            className="btn-primary"
          >
            View Applicants
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard
