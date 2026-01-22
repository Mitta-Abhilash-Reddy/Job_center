import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import JobList from './pages/jobs/JobList'
import JobDetails from './pages/candidate/JobDetails'

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard'
import CandidateProfile from './pages/candidate/Profile'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard'
import CreateJob from './pages/recruiter/CreateJob'
import JobApplicants from './pages/recruiter/JobApplicants'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Candidate Routes */}
        <Route path="/candidate/dashboard" element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateDashboard />
          </ProtectedRoute>
        } />
        <Route path="/candidate/profile" element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateProfile />
          </ProtectedRoute>
        } />

        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/jobs" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/job/create" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <CreateJob />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/job/:id/applicants" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <JobApplicants />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
