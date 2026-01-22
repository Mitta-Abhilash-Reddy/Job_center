# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- Backend API running on `http://localhost:4000`

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🎯 Test the Application

### Test as Candidate
1. Go to `/register`
2. Create account with role: **Candidate**
3. Login and explore:
   - Browse jobs at `/jobs`
   - View job details
   - Apply to jobs
   - Check dashboard at `/candidate/dashboard`
   - Update profile at `/candidate/profile`

### Test as Recruiter
1. Go to `/register`
2. Create account with role: **Recruiter**
3. Login and explore:
   - View dashboard at `/recruiter/dashboard`
   - Create job at `/recruiter/job/create`
   - View applicants
   - Update application status
   - Schedule interviews

## 🔧 Configuration

### Backend API URL
Edit `src/api/axios.js` if your backend runs on a different port:
```javascript
const BASE_URL = 'http://localhost:4000/api'
```

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

Preview production build:
```bash
npm run preview
```

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',  // Change this
  dark: '#0f172a',
  light: '#f8fafc',
}
```

### Modify API Endpoints
All API calls are in individual page components using `axiosInstance` from `src/api/axios.js`

## 🐛 Troubleshooting

### CORS Issues
Make sure your backend has CORS enabled for `http://localhost:3000`

### Token Issues
Clear localStorage and login again:
```javascript
localStorage.clear()
```

### Port Already in Use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change this
}
```

## 📱 Features Checklist

### ✅ Authentication
- [x] Register (Candidate/Recruiter)
- [x] Login
- [x] Auto token refresh
- [x] Protected routes

### ✅ Candidate Features
- [x] Browse jobs
- [x] Search & filter
- [x] View job details
- [x] Apply to jobs
- [x] Track applications
- [x] Update profile

### ✅ Recruiter Features
- [x] Dashboard with stats
- [x] Create job posting
- [x] View all jobs
- [x] View applicants
- [x] Update application status
- [x] Schedule interviews

### ✅ UI/UX
- [x] Modern, clean design
- [x] Responsive layout
- [x] Loading states
- [x] Toast notifications
- [x] Smooth animations
- [x] Glassmorphic elements

## 🚀 Next Steps

### Enhancements You Can Add:
1. **Resume Upload**: Integrate file upload for resumes
2. **Advanced Search**: Add more filters (salary range, experience)
3. **Notifications**: Real-time notifications for new applications
4. **Chat System**: In-app messaging between recruiters and candidates
5. **Analytics**: Dashboard charts and graphs
6. **Email Integration**: Send emails for application updates
7. **Social Login**: Google/LinkedIn OAuth
8. **Dark Mode**: Toggle between light/dark themes
9. **Saved Jobs**: Bookmark jobs for later
10. **Company Profiles**: Detailed company pages

## 📚 Folder Structure Explained

```
src/
├── api/              # API configuration
├── components/       # Reusable UI components
├── context/          # React Context (Auth)
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── auth/         # Login, Register
│   ├── candidate/    # Candidate pages
│   ├── recruiter/    # Recruiter pages
│   └── jobs/         # Job listing
├── utils/            # Helper functions
├── App.jsx           # Main app with routes
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## 🎯 API Endpoints Used

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
GET    /jobs
GET    /jobs/:id
POST   /jobs
POST   /jobs/:id/apply
GET    /jobs/:id/applicants
GET    /applications/my-applications
PATCH  /applications/:id/status
POST   /interviews/schedule
PUT    /users/profile
```

## 💡 Tips

- Use React DevTools to inspect component state
- Check Network tab for API calls
- Use Redux DevTools if you add Redux later
- Keep components small and focused
- Use TypeScript for better type safety (optional)

## 🤝 Support

For issues or questions:
1. Check the console for errors
2. Verify backend is running
3. Check network requests in DevTools
4. Clear browser cache and localStorage

Happy coding! 🎉
