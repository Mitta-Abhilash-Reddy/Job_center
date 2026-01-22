import { Link } from 'react-router-dom'
import { Search, Briefcase, Users, TrendingUp } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match your skills and aspirations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/jobs" className="btn-primary text-lg px-8 py-3">
              Browse Jobs
            </Link>
            <Link to="/register" className="btn-secondary text-lg px-8 py-3">
              Get Started
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Active Jobs</p>
          </div>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
            <p className="text-gray-600">Candidates</p>
          </div>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
            <p className="text-gray-600">Companies</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose JobPortal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Easy Job Search',
    description: 'Find relevant jobs quickly with our advanced search and filtering options.',
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Top Companies',
    description: 'Connect with leading companies across various industries.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Talent Pool',
    description: 'Access a diverse pool of qualified candidates for your openings.',
  },
]

export default Home
