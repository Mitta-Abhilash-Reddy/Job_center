const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    skillsRequired: [String],
    salaryRange: String,
    location: String,
    jobType: String,
    postedAt: { type: Date, default: Date.now },
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
    anonymizeApplicants: { type: Boolean, default: false },
    metadata: {
      views: { type: Number, default: 0 },
      applicantsCount: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Job', jobSchema);


