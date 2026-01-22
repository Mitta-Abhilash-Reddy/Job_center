import { User, Mail, Phone, Calendar } from 'lucide-react'
import { formatDate } from '../utils/formatDate'

const ApplicantCard = ({ applicant, onUpdateStatus, onScheduleInterview }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {applicant.candidate?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{applicant.candidate?.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Mail className="w-4 h-4" />
              <span>{applicant.candidate?.email}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[applicant.status]}`}>
          {applicant.status}
        </span>
      </div>

      {applicant.coverLetter && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{applicant.coverLetter}</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4" />
        <span>Applied on {formatDate(applicant.appliedAt)}</span>
      </div>

      <div className="flex gap-2">
        <select
          value={applicant.status}
          onChange={(e) => onUpdateStatus(applicant._id, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={() => onScheduleInterview(applicant)}
          className="btn-primary text-sm"
        >
          Schedule Interview
        </button>
      </div>
    </div>
  )
}

export default ApplicantCard
