import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../../components/Loader'
import Modal from '../../components/Modal'
import { MapPin, Briefcase, DollarSign, Clock, Building } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'
import toast from 'react-hot-toast'

const JobDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${id}`)
      setJob(data.job || data)
    } catch (error) {
      toast.error('Failed to fetch job details')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setApplying(true)
    try {
      await axiosInstance.post(`/jobs/${id}/apply`, { coverLetter })
      toast.success('Application submitted successfully!')
      setShowApplyModal(false)
      setCoverLetter('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <Loader />
  if (!job) return <div className="text-center py-12">Job not found</div>

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <Building className="w-5 h-5" />
              <span>{job.company}</span>
            </div>
          </div>
          {user?.role === 'candidate' && (
            <button
              onClick={() => setShowApplyModal(true)}
              className="btn-primary"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <span>{job.type}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {job.requirements && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Requirements</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
            </div>
          )}

          {job.responsibilities && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Responsibilities</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for this position"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            You're applying for <strong>{job.title}</strong> at <strong>{job.company}</strong>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter (Optional)
            </label>
            <textarea
              className="input-field"
              rows="6"
              placeholder="Tell us why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
          <button
            onClick={handleApply}
            disabled={applying}
            className="w-full btn-primary"
          >
            {applying ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default JobDetails
