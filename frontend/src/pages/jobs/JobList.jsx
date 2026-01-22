import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios'
import JobCard from '../../components/JobCard'
import Loader from '../../components/Loader'
import { Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ type: '', location: '' })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data } = await axiosInstance.get('/jobs')
      setJobs(data.jobs || data)
    } catch (error) {
      toast.error('Failed to fetch jobs')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filters.type || job.type === filters.type
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())
    return matchesSearch && matchesType && matchesLocation
  })

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
        <p className="text-gray-600">Discover your next career opportunity</p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input-field"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            className="input-field"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No jobs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default JobList
