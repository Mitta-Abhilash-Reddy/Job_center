import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import Sidebar from '../../components/Sidebar'
import ApplicantCard from '../../components/ApplicantCard'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'

const JobApplicants = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [interviewData, setInterviewData] = useState({
    date: '',
    time: '',
    location: '',
    notes: '',
  })

  useEffect(() => {
    fetchApplicants()
  }, [id])

  const fetchApplicants = async () => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${id}/applicants`)
      setJob(data.job)
      setApplicants(data.applicants || data.applications || [])
    } catch (error) {
      toast.error('Failed to fetch applicants')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axiosInstance.patch(`/applications/${applicationId}/status`, { status })
      setApplicants(applicants.map(app =>
        app._id === applicationId ? { ...app, status } : app
      ))
      toast.success('Status updated successfully')
    } catch (error) {
      toast.error('Failed to update status')
      console.error(error)
    }
  }

  const handleScheduleInterview = (applicant) => {
    setSelectedApplicant(applicant)
    setShowInterviewModal(true)
  }

  const submitInterview = async () => {
    try {
      await axiosInstance.post('/interviews/schedule', {
        applicationId: selectedApplicant._id,
        ...interviewData,
      })
      toast.success('Interview scheduled successfully')
      setShowInterviewModal(false)
      setInterviewData({ date: '', time: '', location: '', notes: '' })
    } catch (error) {
      toast.error('Failed to schedule interview')
      console.error(error)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{job?.title}</h1>
          <p className="text-gray-600">{applicants.length} applicants</p>
        </div>

        {applicants.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-600 text-lg">No applicants yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                onUpdateStatus={handleUpdateStatus}
                onScheduleInterview={handleScheduleInterview}
              />
            ))}
          </div>
        )}

        {/* Interview Modal */}
        <Modal
          isOpen={showInterviewModal}
          onClose={() => setShowInterviewModal(false)}
          title="Schedule Interview"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Scheduling interview with <strong>{selectedApplicant?.candidate?.name}</strong>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={interviewData.date}
                  onChange={(e) => setInterviewData({ ...interviewData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  className="input-field"
                  value={interviewData.time}
                  onChange={(e) => setInterviewData({ ...interviewData, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="Office or Video call link"
                value={interviewData.location}
                onChange={(e) => setInterviewData({ ...interviewData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                className="input-field"
                rows="3"
                placeholder="Additional notes..."
                value={interviewData.notes}
                onChange={(e) => setInterviewData({ ...interviewData, notes: e.target.value })}
              />
            </div>
            <button onClick={submitInterview} className="w-full btn-primary">
              Schedule Interview
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default JobApplicants
