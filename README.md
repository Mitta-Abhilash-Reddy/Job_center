# Job Center – Full Stack Job Portal (MERN)

Job Center is a full-stack web application designed to connect job seekers with recruiters. It provides a platform for users to apply for jobs, manage applications, and for recruiters to post job openings and manage applicants.

## Features
- User authentication (JWT, role-based access)
- Job posting and application management
- Resume parsing and upload
- Interview scheduling and notifications
- Admin metrics and reporting

## Tech Stack
### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Jest (Testing)

## Folder Structure
```
job_portal_1/
├── backend/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   ├── README.md
│   ├── server.js
│   └── src/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── README.md
```

## Setup Instructions
### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set the required environment variables.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
### Backend
- **PORT:** Port number for the server (default is 5000).
- **MONGO_URI:** Connection string for MongoDB.
- **JWT_ACCESS_SECRET:** Secret key for JWT authentication.

### Frontend
- No specific environment variables required.

## Run Commands
### Backend
To start the backend server in development mode:
```bash
cd backend
npm start
```

### Frontend
To start the frontend application in development mode:
```bash
cd frontend
npm run dev
```

## API Documentation
- Swagger documentation can be accessed at `/api/docs`.

## Docker
To run the application using Docker, use the following command:
```bash
docker-compose up
```

## Testing
The backend is tested using Jest and Supertest. To run tests, execute:
```bash
cd backend
npm test
```

## Screenshots
Screenshots: Coming soon.

---

Feel free to contribute to this project by submitting issues or pull requests!