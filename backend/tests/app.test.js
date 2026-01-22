const request = require('supertest');
const jwt = require('jsonwebtoken');
jest.mock('../src/services/authService');
jest.mock('../src/models/User');
jest.mock('../src/models/Job');
jest.mock('../src/models/Application');

const authService = require('../src/services/authService');
const User = require('../src/models/User');
const Job = require('../src/models/Job');
const Application = require('../src/models/Application');
const app = require('../src/app');

describe('Auth flows', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('register', async () => {
    authService.register.mockResolvedValue({ user: { email: 'a@test.com' }, accessToken: 'a', refreshToken: 'b' });
    const res = await request(app).post('/api/auth/register').send({ email: 'a@test.com', password: '123' });
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('a@test.com');
  });

  test('login', async () => {
    authService.login.mockResolvedValue({ user: { email: 'a@test.com' }, accessToken: 'a', refreshToken: 'b' });
    const res = await request(app).post('/api/auth/login').send({ email: 'a@test.com', password: '123' });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBe('a');
  });
});

describe('Protected route', () => {
  test('requires auth', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.status).toBe(401);
  });

  test('allows auth', async () => {
    const token = jwt.sign({ userId: '1', role: 'candidate' }, 'secret');
    User.findById = jest.fn().mockResolvedValue({ _id: '1', role: 'candidate' });
    const res = await request(app).get('/api/users/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

describe('Job and applications', () => {
  test('create job', async () => {
    const token = jwt.sign({ userId: 'r1', role: 'recruiter' }, 'secret');
    User.findById = jest.fn().mockResolvedValue({ _id: 'r1', role: 'recruiter' });
    Job.create = jest.fn().mockResolvedValue({ title: 'Backend' });
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Backend' });
    expect(res.status).toBe(201);
  });

  test('apply flow', async () => {
    const token = jwt.sign({ userId: 'c1', role: 'candidate' }, 'secret');
    User.findById = jest.fn().mockResolvedValue({ _id: 'c1', role: 'candidate' });
    Job.findById = jest.fn().mockResolvedValue({ _id: 'j1', companyId: 'r1', metadata: { applicantsCount: 0 }, save: jest.fn() });
    Application.create = jest.fn().mockResolvedValue({ jobId: 'j1', candidateId: 'c1' });
    const res = await request(app)
      .post('/api/jobs/j1/apply')
      .set('Authorization', `Bearer ${token}`)
      .send({ resumeSnapshot: { skills: [] } });
    expect(res.status).toBe(201);
  });
});

