# 📦 Component Documentation

## Core Components

### 🔐 AuthContext
**Location**: `src/context/AuthContext.jsx`

Provides authentication state and methods throughout the app.

**State**:
- `user` - Current logged-in user object
- `loading` - Auth initialization loading state

**Methods**:
- `login(email, password)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `updateUser(data)` - Update user info

**Usage**:
```jsx
import { useAuth } from '../hooks/useAuth'

const { user, login, logout } = useAuth()
```

---

### 🛡️ ProtectedRoute
**Location**: `src/components/ProtectedRoute.jsx`

Protects routes based on authentication and role.

**Props**:
- `children` - Component to render if authorized
- `allowedRoles` - Array of allowed roles (e.g., ['candidate'])

**Usage**:
```jsx
<Route path="/candidate/dashboard" element={
  <ProtectedRoute allowedRoles={['candidate']}>
    <CandidateDashboard />
  </ProtectedRoute>
} />
```

---

### 🎨 UI Components

#### Navbar
**Location**: `src/components/Navbar.jsx`

Top navigation bar with logo, links, and auth buttons.

**Features**:
- Responsive design
- Dynamic links based on auth state
- Role-based navigation

---

#### Sidebar
**Location**: `src/components/Sidebar.jsx`

Left sidebar for recruiter dashboard.

**Features**:
- Navigation links
- Active state highlighting
- Icons for each section

---

#### JobCard
**Location**: `src/components/JobCard.jsx`

Displays job listing in card format.

**Props**:
- `job` - Job object with title, company, location, etc.

**Features**:
- Hover effects
- Time ago display
- Job type badge
- Click to view details

**Usage**:
```jsx
<JobCard job={jobObject} />
```

---

#### ApplicantCard
**Location**: `src/components/ApplicantCard.jsx`

Displays applicant information for recruiters.

**Props**:
- `applicant` - Applicant object
- `onUpdateStatus` - Callback for status update
- `onScheduleInterview` - Callback for interview scheduling

**Features**:
- Status badge with colors
- Status dropdown
- Schedule interview button
- Cover letter preview

**Usage**:
```jsx
<ApplicantCard 
  applicant={applicant}
  onUpdateStatus={handleStatusUpdate}
  onScheduleInterview={handleSchedule}
/>
```

---

#### Modal
**Location**: `src/components/Modal.jsx`

Reusable modal component.

**Props**:
- `isOpen` - Boolean to show/hide
- `onClose` - Close callback
- `title` - Modal title
- `children` - Modal content

**Features**:
- Backdrop blur
- Smooth animations
- Scrollable content
- Close button

**Usage**:
```jsx
<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply">
  <p>Modal content here</p>
</Modal>
```

---

#### Loader
**Location**: `src/components/Loader.jsx`

Loading spinner component.

**Props**:
- `fullScreen` - Boolean for full-screen loader (default: true)

**Usage**:
```jsx
{loading && <Loader />}
{loading && <Loader fullScreen={false} />}
```

---

## Page Components

### 🏠 Home
**Location**: `src/pages/Home.jsx`

Landing page with hero section and features.

**Features**:
- Hero section with CTA buttons
- Stats cards
- Features grid
- Responsive layout

---

### 🔑 Auth Pages

#### Login
**Location**: `src/pages/auth/Login.jsx`

User login page.

**Features**:
- Email/password form
- Loading state
- Error handling
- Link to register

---

#### Register
**Location**: `src/pages/auth/Register.jsx`

User registration page.

**Features**:
- Name, email, password fields
- Role selection (Candidate/Recruiter)
- Visual role cards
- Link to login

---

### 👤 Candidate Pages

#### Dashboard
**Location**: `src/pages/candidate/Dashboard.jsx`

Candidate dashboard with stats and applications.

**Features**:
- Application stats cards
- Quick action links
- Recent applications list
- Status badges

---

#### Profile
**Location**: `src/pages/candidate/Profile.jsx`

Profile management page.

**Features**:
- Edit name, email, phone
- Bio textarea
- Resume upload button (UI only)
- Save changes

---

#### JobDetails
**Location**: `src/pages/candidate/JobDetails.jsx`

Detailed job view with apply functionality.

**Features**:
- Full job description
- Requirements and responsibilities
- Apply modal with cover letter
- Job metadata (location, type, salary)

---

### 💼 Recruiter Pages

#### Dashboard
**Location**: `src/pages/recruiter/Dashboard.jsx`

Recruiter dashboard with jobs and stats.

**Features**:
- Stats cards (jobs, applications)
- Create job CTA
- Job listings with applicant count
- View applicants button

---

#### CreateJob
**Location**: `src/pages/recruiter/CreateJob.jsx`

Job creation form.

**Features**:
- Multi-field form
- Job type dropdown
- Textarea for description
- Form validation
- Cancel button

---

#### JobApplicants
**Location**: `src/pages/recruiter/JobApplicants.jsx`

View and manage job applicants.

**Features**:
- Applicant cards grid
- Status update dropdown
- Schedule interview modal
- Interview form (date, time, location)

---

### 📋 Job Pages

#### JobList
**Location**: `src/pages/jobs/JobList.jsx`

Browse all jobs with search and filters.

**Features**:
- Search by title/company
- Filter by type and location
- Responsive grid
- Empty state

---

## 🔧 Utilities

### formatDate
**Location**: `src/utils/formatDate.js`

Date formatting utilities.

**Functions**:
- `formatDate(dateString)` - Returns "Jan 15, 2024"
- `formatDateTime(dateString)` - Returns "Jan 15, 2024, 10:30 AM"
- `timeAgo(dateString)` - Returns "2 hours ago"

**Usage**:
```jsx
import { formatDate, timeAgo } from '../utils/formatDate'

<p>{formatDate(job.createdAt)}</p>
<p>{timeAgo(application.appliedAt)}</p>
```

---

### axios
**Location**: `src/api/axios.js`

Configured axios instance with interceptors.

**Features**:
- Auto-attach access token
- Auto-refresh on 401
- Logout on refresh failure
- Base URL configuration

**Usage**:
```jsx
import axiosInstance from '../api/axios'

const { data } = await axiosInstance.get('/jobs')
const response = await axiosInstance.post('/jobs', jobData)
```

---

## 🎨 Styling

### Tailwind Classes

**Custom Classes** (defined in `src/index.css`):

```css
.glass - Glassmorphic background
.btn-primary - Primary button style
.btn-secondary - Secondary button style
.input-field - Form input style
.card - Card container style
```

**Usage**:
```jsx
<div className="card p-6">
  <input className="input-field" />
  <button className="btn-primary">Submit</button>
</div>
```

---

## 🔄 State Management

### Local State
- `useState` for component-level state
- Form inputs, modals, loading states

### Context State
- `AuthContext` for global auth state
- User info, login status

### Server State
- Fetched from API
- Jobs, applications, applicants
- Stored in component state

---

## 🚀 Best Practices

1. **Component Size**: Keep components under 200 lines
2. **Reusability**: Extract repeated UI into components
3. **Props**: Use destructuring for cleaner code
4. **Error Handling**: Always wrap API calls in try-catch
5. **Loading States**: Show loaders during async operations
6. **Validation**: Validate forms before submission
7. **Accessibility**: Use semantic HTML and ARIA labels
8. **Performance**: Use React.memo for expensive components

---

## 📝 Adding New Components

### Template:
```jsx
import { useState } from 'react'

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null)

  const handleAction = () => {
    // Logic here
  }

  return (
    <div className="card p-6">
      {/* Component JSX */}
    </div>
  )
}

export default MyComponent
```

### Steps:
1. Create file in appropriate folder
2. Import dependencies
3. Define props and state
4. Implement logic
5. Return JSX
6. Export component
7. Import and use in parent

---

## 🎯 Component Hierarchy

```
App
├── Navbar
└── Routes
    ├── Home
    ├── Login
    ├── Register
    ├── JobList
    │   └── JobCard (multiple)
    ├── JobDetails
    │   └── Modal (apply)
    ├── CandidateDashboard
    ├── CandidateProfile
    ├── RecruiterDashboard
    │   ├── Sidebar
    │   └── JobCard (multiple)
    ├── CreateJob
    │   └── Sidebar
    └── JobApplicants
        ├── Sidebar
        ├── ApplicantCard (multiple)
        └── Modal (interview)
```

---

## 🔍 Component Testing Tips

1. Test with different user roles
2. Test loading and error states
3. Test form validation
4. Test responsive design
5. Test with empty data
6. Test API failures
7. Test token expiration

Happy building! 🎉
