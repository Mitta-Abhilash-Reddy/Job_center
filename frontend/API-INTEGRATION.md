# 🔌 API Integration Guide

## Base Configuration

### Axios Instance
**File**: `src/api/axios.js`

```javascript
const BASE_URL = 'http://localhost:4000/api'
```

All API calls use this configured instance with:
- Automatic token attachment
- Token refresh on 401
- Error handling

---

## Authentication Endpoints

### Register
```javascript
POST /auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "candidate" // or "recruiter"
}

Response:
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Implementation**: `src/pages/auth/Register.jsx`

---

### Login
```javascript
POST /auth/login

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Implementation**: `src/pages/auth/Login.jsx`

---

### Refresh Token
```javascript
POST /auth/refresh

Body:
{
  "refreshToken": "eyJhbGc..."
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..." // optional new refresh token
}
```

**Implementation**: `src/api/axios.js` (interceptor)

---

## Job Endpoints

### Get All Jobs
```javascript
GET /jobs

Query Params (optional):
- type: "Full-time" | "Part-time" | "Contract" | "Remote"
- location: "New York"
- search: "developer"
- createdBy: "me" (for recruiter's own jobs)

Response:
{
  "jobs": [
    {
      "_id": "...",
      "title": "Senior Developer",
      "company": "Tech Corp",
      "location": "New York, NY",
      "type": "Full-time",
      "salary": "$100k - $150k",
      "description": "...",
      "requirements": "...",
      "responsibilities": "...",
      "createdAt": "2024-01-15T10:00:00Z",
      "applicants": []
    }
  ]
}
```

**Implementation**: `src/pages/jobs/JobList.jsx`

---

### Get Job by ID
```javascript
GET /jobs/:id

Response:
{
  "job": {
    "_id": "...",
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "New York, NY",
    "type": "Full-time",
    "salary": "$100k - $150k",
    "description": "...",
    "requirements": "...",
    "responsibilities": "...",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

**Implementation**: `src/pages/candidate/JobDetails.jsx`

---

### Create Job (Recruiter Only)
```javascript
POST /jobs

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "location": "New York, NY",
  "type": "Full-time",
  "salary": "$100k - $150k",
  "description": "We are looking for...",
  "requirements": "5+ years experience...",
  "responsibilities": "Lead development..."
}

Response:
{
  "job": {
    "_id": "...",
    "title": "Senior Developer",
    ...
  }
}
```

**Implementation**: `src/pages/recruiter/CreateJob.jsx`

---

### Apply to Job (Candidate Only)
```javascript
POST /jobs/:id/apply

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "coverLetter": "I am interested in this position..." // optional
}

Response:
{
  "application": {
    "_id": "...",
    "job": "...",
    "candidate": "...",
    "status": "pending",
    "coverLetter": "...",
    "appliedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Implementation**: `src/pages/candidate/JobDetails.jsx`

---

### Get Job Applicants (Recruiter Only)
```javascript
GET /jobs/:id/applicants

Headers:
Authorization: Bearer <accessToken>

Response:
{
  "job": {
    "_id": "...",
    "title": "Senior Developer"
  },
  "applicants": [
    {
      "_id": "...",
      "candidate": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "pending",
      "coverLetter": "...",
      "appliedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Implementation**: `src/pages/recruiter/JobApplicants.jsx`

---

## Application Endpoints

### Get My Applications (Candidate Only)
```javascript
GET /applications/my-applications

Headers:
Authorization: Bearer <accessToken>

Response:
{
  "applications": [
    {
      "_id": "...",
      "job": {
        "_id": "...",
        "title": "Senior Developer",
        "company": "Tech Corp"
      },
      "status": "pending",
      "appliedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Implementation**: `src/pages/candidate/Dashboard.jsx`

---

### Update Application Status (Recruiter Only)
```javascript
PATCH /applications/:id/status

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "status": "reviewed" // "pending" | "reviewed" | "shortlisted" | "rejected"
}

Response:
{
  "application": {
    "_id": "...",
    "status": "reviewed",
    ...
  }
}
```

**Implementation**: `src/pages/recruiter/JobApplicants.jsx`

---

## Interview Endpoints

### Schedule Interview (Recruiter Only)
```javascript
POST /interviews/schedule

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "applicationId": "...",
  "date": "2024-01-20",
  "time": "10:00",
  "location": "Office or Zoom link",
  "notes": "Please bring portfolio"
}

Response:
{
  "interview": {
    "_id": "...",
    "application": "...",
    "date": "2024-01-20",
    "time": "10:00",
    "location": "...",
    "notes": "..."
  }
}
```

**Implementation**: `src/pages/recruiter/JobApplicants.jsx`

---

## User Endpoints

### Update Profile
```javascript
PUT /users/profile

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "bio": "Experienced developer..."
}

Response:
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "bio": "..."
  }
}
```

**Implementation**: `src/pages/candidate/Profile.jsx`

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": {
    "email": "Email is required"
  }
}
```

#### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

#### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

---

## Token Management

### Storage
Tokens are stored in `localStorage`:
```javascript
localStorage.setItem('accessToken', token)
localStorage.setItem('refreshToken', token)
localStorage.setItem('user', JSON.stringify(user))
```

### Retrieval
```javascript
const token = localStorage.getItem('accessToken')
const user = JSON.parse(localStorage.getItem('user'))
```

### Clearing
```javascript
localStorage.removeItem('accessToken')
localStorage.removeItem('refreshToken')
localStorage.removeItem('user')
```

---

## Request Interceptor

**File**: `src/api/axios.js`

```javascript
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)
```

**What it does**:
- Automatically attaches access token to all requests
- No need to manually add Authorization header

---

## Response Interceptor

**File**: `src/api/axios.js`

```javascript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken')
      const { data } = await axios.post('/auth/refresh', { refreshToken })
      
      // Store new token
      localStorage.setItem('accessToken', data.accessToken)
      
      // Retry original request
      return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)
```

**What it does**:
- Catches 401 errors
- Automatically refreshes token
- Retries failed request
- Logs out if refresh fails

---

## Usage Examples

### Fetching Data
```javascript
import axiosInstance from '../api/axios'

const fetchJobs = async () => {
  try {
    const { data } = await axiosInstance.get('/jobs')
    setJobs(data.jobs)
  } catch (error) {
    console.error(error)
    toast.error('Failed to fetch jobs')
  }
}
```

### Posting Data
```javascript
const createJob = async (jobData) => {
  try {
    const { data } = await axiosInstance.post('/jobs', jobData)
    toast.success('Job created!')
    return data.job
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed')
    throw error
  }
}
```

### Updating Data
```javascript
const updateStatus = async (id, status) => {
  try {
    await axiosInstance.patch(`/applications/${id}/status`, { status })
    toast.success('Status updated')
  } catch (error) {
    toast.error('Update failed')
  }
}
```

---

## Testing API Calls

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Perform action in app
4. Check request/response

### Check Request
- URL
- Method (GET, POST, etc.)
- Headers (Authorization)
- Body (for POST/PUT)

### Check Response
- Status code (200, 401, etc.)
- Response data
- Error messages

---

## Common Issues

### CORS Error
**Problem**: Backend not allowing frontend origin

**Solution**: Backend needs CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

---

### 401 Unauthorized
**Problem**: Token expired or invalid

**Solution**: 
- Check token in localStorage
- Verify token format
- Check token expiration
- Try logging in again

---

### Network Error
**Problem**: Backend not running

**Solution**:
- Start backend server
- Check backend URL in `axios.js`
- Verify port number

---

### Token Not Refreshing
**Problem**: Refresh token expired

**Solution**:
- User needs to login again
- Check refresh token endpoint
- Verify refresh token storage

---

## API Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Token stored in localStorage
- [ ] Protected routes accessible
- [ ] Fetch jobs list
- [ ] View job details
- [ ] Apply to job (candidate)
- [ ] Create job (recruiter)
- [ ] View applicants (recruiter)
- [ ] Update application status
- [ ] Schedule interview
- [ ] Update profile
- [ ] Logout clears tokens
- [ ] Token refresh on 401

---

## Backend Requirements

Your backend should support:

1. **CORS** for `http://localhost:3000`
2. **JWT** authentication
3. **Refresh token** endpoint
4. **Role-based** access control
5. **Error handling** with proper status codes
6. **Validation** for request bodies

---

## Security Best Practices

1. **HTTPS** in production
2. **Secure** token storage (consider httpOnly cookies)
3. **Token expiration** (short-lived access tokens)
4. **Input validation** on backend
5. **Rate limiting** to prevent abuse
6. **CSRF protection** if using cookies
7. **XSS protection** (sanitize inputs)

---

## Production Considerations

### Environment Variables
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
```

### Error Logging
```javascript
if (import.meta.env.PROD) {
  // Send to error tracking service
  Sentry.captureException(error)
}
```

### API Versioning
```javascript
const BASE_URL = 'https://api.example.com/v1'
```

---

Happy integrating! 🚀
