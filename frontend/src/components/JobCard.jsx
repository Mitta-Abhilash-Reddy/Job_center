import { Link } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import { timeAgo } from '../utils/formatDate'

const JobCard = ({ job }) => {
  return (
    <Link to={`/job/${job._id}`} className="card p-6 hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-primary text-sm font-medium rounded-full">
          {job.type}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{job.experience || 'Any'}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{timeAgo(job.createdAt)}</span>
        </div>
        <button className="text-primary font-medium hover:underline">
          View Details →
        </button>
      </div>
    </Link>
  )
}

export default JobCard
