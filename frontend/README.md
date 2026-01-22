# 🚀 Job Portal Frontend

A modern, production-grade React frontend for an Advanced Job Portal built with React 18, Vite, TailwindCSS, and Context API.

## ✨ Features

### Authentication
- User registration (Candidate/Recruiter)
- Login with JWT tokens
- Automatic token refresh
- Protected routes based on roles

### Candidate Features
- Browse and search jobs
- Filter by type, location
- View job details
- Apply to jobs with cover letter
- Track application status
- Update profile

### Recruiter Features
- Post new jobs
- Manage job listings
- View applicants
- Update application status
- Schedule interviews

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🔧 Configuration

The backend API URL is configured in `src/api/axios.js`:
```javascript
const BASE_URL = 'http://localhost:4000/api'
```

## 📁 Project Structure

```
src/
├── api/
│   └── axios.js              # Axios instance with interceptors
├── components/
│   ├── Navbar.jsx            # Top navigation
│   ├── Sidebar.jsx           # Recruiter sidebar
│   ├── JobCard.jsx           # Job listing card
│   ├── ApplicantCard.jsx     # Applicant card
│   ├── Loader.jsx            # Loading spinner
│   ├── Modal.jsx             # Reusable modal
│   └── ProtectedRoute.jsx    # Route protection
├── context/
│   └── AuthContext.jsx       # Authentication context
├── hooks/
│   └── useAuth.js            # Auth hook
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── candidate/
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   └── JobDetails.jsx
│   ├── recruiter/
│   │   ├── Dashboard.jsx
│   │   ├── CreateJob.jsx
│   │   └── JobApplicants.jsx
│   ├── jobs/
│   │   └── JobList.jsx
│   └── Home.jsx
├── utils/
│   └── formatDate.js         # Date utilities
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🎨 Design Features

- Clean, modern UI with glassmorphic elements
- Gradient accents and soft shadows
- Smooth animations and transitions
- Responsive design for all devices
- Professional color scheme (Blue #2563eb)
- Custom scrollbar styling
- Toast notifications

## 🔐 Authentication Flow

1. User logs in → receives access & refresh tokens
2. Tokens stored in localStorage
3. Access token attached to all API requests
4. On 401 error → automatically refresh token
5. If refresh fails → redirect to login

## 🚦 Routes

### Public Routes
- `/` - Homepage
- `/login` - Login page
- `/register` - Registration
- `/jobs` - Browse jobs
- `/job/:id` - Job details

### Candidate Routes (Protected)
- `/candidate/dashboard` - Candidate dashboard
- `/candidate/profile` - Profile management

### Recruiter Routes (Protected)
- `/recruiter/dashboard` - Recruiter dashboard
- `/recruiter/jobs` - Manage jobs
- `/recruiter/job/create` - Create new job
- `/recruiter/job/:id/applicants` - View applicants

## 🎯 API Integration

All API calls use the configured axios instance with:
- Automatic token attachment
- Token refresh on 401
- Error handling
- Base URL configuration

## 🚀 Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📝 Environment Variables

Create a `.env` file if you need to customize:
```
VITE_API_URL=http://localhost:4000/api
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',
  dark: '#0f172a',
  light: '#f8fafc',
}
```

### Styling
Global styles in `src/index.css`
Component-specific styles use Tailwind utility classes

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grids and layouts
- Touch-friendly UI elements

## 🔥 Key Features

- **Token Management**: Automatic refresh, secure storage
- **Role-Based Access**: Different dashboards for candidates/recruiters
- **Real-time Updates**: Toast notifications for all actions
- **Error Handling**: Graceful error messages
- **Loading States**: Skeleton loaders and spinners
- **Form Validation**: Client-side validation
- **Search & Filter**: Advanced job filtering
- **Modal System**: Reusable modal component

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend!

## 📄 License

MIT License
