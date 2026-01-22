const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

dotenv.config();

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Job.deleteMany({}), Application.deleteMany({})]);

  const passwordHash = await bcrypt.hash('password123', 10);
  const companies = await User.insertMany([
    { name: 'Company A', email: 'hr@a.com', passwordHash, role: 'recruiter' },
    { name: 'Company B', email: 'hr@b.com', passwordHash, role: 'recruiter' },
    { name: 'Company C', email: 'hr@c.com', passwordHash, role: 'recruiter' },
  ]);

  const candidates = await User.insertMany([
    { name: 'Alice Candidate', email: 'alice@c.com', passwordHash, role: 'candidate', profile: { skills: ['javascript', 'node'] } },
    { name: 'Bob Candidate', email: 'bob@c.com', passwordHash, role: 'candidate', profile: { skills: ['react', 'node'] } },
    { name: 'Cara Candidate', email: 'cara@c.com', passwordHash, role: 'candidate', profile: { skills: ['python', 'ml'] } },
  ]);

  const jobs = await Job.insertMany([
    { companyId: companies[0]._id, title: 'Backend Engineer', skillsRequired: ['node', 'mongodb'], location: 'Remote' },
    { companyId: companies[0]._id, title: 'Frontend Engineer', skillsRequired: ['react', 'css'], location: 'Remote' },
    { companyId: companies[1]._id, title: 'Data Scientist', skillsRequired: ['python', 'ml'], location: 'NY' },
    { companyId: companies[2]._id, title: 'DevOps', skillsRequired: ['aws', 'docker'], location: 'SF' },
    { companyId: companies[2]._id, title: 'Fullstack', skillsRequired: ['node', 'react'], location: 'LA' },
  ]);

  await Application.insertMany([
    { jobId: jobs[0]._id, candidateId: candidates[0]._id, status: 'applied' },
    { jobId: jobs[1]._id, candidateId: candidates[1]._id, status: 'applied' },
    { jobId: jobs[2]._id, candidateId: candidates[2]._id, status: 'applied' },
    { jobId: jobs[3]._id, candidateId: candidates[0]._id, status: 'applied' },
    { jobId: jobs[4]._id, candidateId: candidates[1]._id, status: 'applied' },
  ]);

  console.log('Seed complete');
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


