const mongoose = require('mongoose');

const resumeSnapshotSchema = new mongoose.Schema({
  skills: [String],
  experienceSummary: String,
  yearsExperience: Number,
});

const profileSchema = new mongoose.Schema({
  headline: String,
  location: String,
  phone: String,
  skills: [String],
  education: [String],
  experience: [String],
  projects: [String],
  resumeUrl: String,
  resumeSnapshot: resumeSnapshotSchema,
});

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now, expires: '30d' },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'recruiter', 'admin'], default: 'candidate' },
    profile: profileSchema,
    refreshTokens: [refreshTokenSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);


