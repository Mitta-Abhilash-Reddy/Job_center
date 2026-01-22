# ⚡ Quick Reference Card

## 🚀 Getting Started (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/api/axios.js` | API configuration |
| `src/context/AuthContext.jsx` | Auth state management |
| `src/App.jsx` | Routes & navigation |
| `tailwind.config.js` | Theme colors |
| `package.json` | Dependencies |

---

## 🎨 Tailwind Classes

```jsx
// Buttons
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>

// Inputs
<input className="input-field" />

// Cards
<div className="card p-6">Content</div>

// Glass effect
<div className="glass">Content</div>
```

---

## 🔐 Auth Hook

```jsx
import { useAuth } from '../hooks/useAuth'

const { user, login, logout, register } = useAuth()

// Check if logged in
if (user) { ... }

// Check role
if (user?.role === 'candidate') { ... }
```

---

## 🌐 API Calls

```jsx
import axiosInstance from '../api/axios'

// GET
const { data } = await axiosInstance.get('/jobs')

// POST
await axiosInstance.post('/jobs', jobData)

// PATCH
await axiosInstance.patch(`/applications/${id}/status`, { status })
```

---

## 🛣️ Routes

### Public
- `/` - Home
- `/login` - Login
- `/register` - Register
- `/jobs` - Browse jobs
- `/job/:id` - Job details

### Candidate (Protected)
- `/candidate/dashboard`
- `/candidate/profile`

### Recruiter (Protected)
- `/recruiter/dashboard`
- `/recruiter/jobs`
- `/recruiter/job/create`
- `/recruiter/job/:id/applicants`

---

## 🎯 Common Tasks

### Navigate Programmatically
```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/jobs')
```

### Show Toast
```jsx
import toast from 'react-hot-toast'

toast.success('Success!')
toast.error('Error!')
```

### Format Date
```jsx
import { formatDate, timeAgo } from '../utils/formatDate'

formatDate(date)  // "Jan 15, 2024"
timeAgo(date)     // "2 hours ago"
```

### Protected Route
```jsx
<Route path="/candidate/dashboard" element={
  <ProtectedRoute allowedRoles={['candidate']}>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 🎨 Colors

```javascript
Primary:  #2563eb
Dark:     #0f172a
Light:    #f8fafc
Success:  #10b981
Warning:  #f59e0b
Error:    #ef4444
```

---

## 📦 Components

### Modal
```jsx
<Modal isOpen={show} onClose={() => setShow(false)} title="Title">
  Content
</Modal>
```

### Loader
```jsx
<Loader />  // Full screen
<Loader fullScreen={false} />  // Inline
```

### JobCard
```jsx
<JobCard job={jobObject} />
```

### ApplicantCard
```jsx
<ApplicantCard 
  applicant={applicant}
  onUpdateStatus={handleUpdate}
  onScheduleInterview={handleSchedule}
/>
```

---

## 🔧 Debugging

### Check Auth State
```javascript
console.log(localStorage.getItem('accessToken'))
console.log(localStorage.getItem('user'))
```

### Clear Auth
```javascript
localStorage.clear()
```

### Check API Calls
- Open DevTools (F12)
- Network tab
- Look for failed requests

---

## 📝 Form Example

```jsx
const [formData, setFormData] = useState({ name: '', email: '' })

<form onSubmit={handleSubmit}>
  <input
    className="input-field"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  />
  <button className="btn-primary">Submit</button>
</form>
```

---

## 🎯 Status Colors

```jsx
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  shortlisted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

<span className={statusColors[status]}>{status}</span>
```

---

## 🔄 State Management

### Component State
```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)
```

### Context State
```jsx
const { user, login, logout } = useAuth()
```

---

## 📱 Responsive Grid

```jsx
// 1 col mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## 🎨 Icons

```jsx
import { Briefcase, User, MapPin } from 'lucide-react'

<Briefcase className="w-5 h-5" />
```

---

## 🚨 Error Handling

```jsx
try {
  const { data } = await axiosInstance.get('/jobs')
  setJobs(data.jobs)
} catch (error) {
  console.error(error)
  toast.error(error.response?.data?.message || 'Failed')
}
```

---

## 🔐 Token Flow

1. User logs in
2. Tokens stored in localStorage
3. Token attached to requests (automatic)
4. On 401 → refresh token (automatic)
5. If refresh fails → logout

---

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

---

## 🎯 Testing Checklist

- [ ] Register as candidate
- [ ] Register as recruiter
- [ ] Login/logout
- [ ] Browse jobs
- [ ] Apply to job
- [ ] Create job (recruiter)
- [ ] View applicants
- [ ] Update status
- [ ] Schedule interview
- [ ] Update profile

---

## 🐛 Common Issues

### Port in use
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

### CORS error
- Check backend CORS settings
- Verify API URL

### Token expired
```javascript
localStorage.clear()
// Login again
```

---

## 📚 Documentation Files

- `README.md` - Overview
- `SETUP.md` - Installation guide
- `COMPONENTS.md` - Component docs
- `API-INTEGRATION.md` - API guide
- `UI-GUIDE.md` - Design system
- `QUICK-REFERENCE.md` - This file

---

## 🎉 You're Ready!

Start the dev server and begin building:
```bash
npm run dev
```

Happy coding! 🚀
