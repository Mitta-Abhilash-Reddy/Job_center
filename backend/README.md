# Advanced Job Portal Backend (Node.js + Express + MongoDB)

Production-ready backend with resume parsing via ApyHub.

## Features
- JWT auth (access + refresh), role-based access (candidate, recruiter, admin)
- Resume upload (Multer) + ApyHub parsing
- Jobs, applications, interview scheduling, notifications
- Swagger docs, Jest + Supertest tests, Docker setup, seed data

## Installation
```bash
npm install
```

## Environment
Copy `.env.example` to `.env` and set values:
- `PORT`
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `APYHUB_API_KEY`
- `USE_APYHUB`
- `APYHUB_ENDPOINT`
- `FRONTEND_URL`

## Scripts
- `npm run dev` – start with nodemon
- `npm start` – production start
- `npm test` – Jest + Supertest
- `npm run seed` – load sample data

## API Base
`/api` with Swagger at `/api/docs`.

## Key Endpoints
- Auth: `POST /auth/register|login|refresh|logout`
- Users: `GET/PUT /users/me`, `POST /users/me/resume`
- Jobs: `POST /jobs`, `GET /jobs`, `GET/PUT/DELETE /jobs/:id`, `POST /jobs/:id/apply`, `GET /jobs/:id/applicants`
- Applications: `GET /applications/me`, `PUT /applications/:id/status`
- Interviews: `POST /interviews/schedule`, `GET /interviews/:id`
- Admin: `GET /admin/metrics`, `POST /admin/moderate/job/:id`
- Notifications: `GET /notifications/me`

## MongoDB Setup
- Local: ensure `mongod` running or use Docker compose.
- Atlas: set `MONGO_URI` accordingly.

## ApyHub Integration
Set `APYHUB_API_KEY`. Resume parsing calls `https://api.apyhub.com/processor/resume/parser`. If `USE_APYHUB=false` or the key is missing, mock data is returned.

## Docker
```bash
docker-compose up --build
```
Backend at `http://localhost:4000`.

## Testing
```bash
npm test
```
Mocks models/services for fast CI.

## Seed Data
```bash
npm run seed
```
Creates 3 companies, 5 jobs, 3 candidates, 5 applications.

## Auth Flow (diagram)
- Client -> /auth/login -> access + refresh
- Access token in `Authorization: Bearer`
- Refresh token -> /auth/refresh -> new pair
- /auth/logout removes refresh token

## ER Diagram (text)
- User (profile, role, refreshTokens)
- Job (companyId -> User)
- Application (jobId -> Job, candidateId -> User)
- InterviewRecord (applicationId -> Application)
- Notification (userId -> User)

## Folder Structure
See `backend/src` for config, models, controllers, services, routes, utils, uploads.

## Production Notes
- Add HTTPS termination, rate limits, WAF as needed.
- Configure CORS `FRONTEND_URL`.
- Replace placeholder email service with provider.

