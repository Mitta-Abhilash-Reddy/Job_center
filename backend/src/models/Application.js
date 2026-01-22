const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeSnapshot: {
      skills: [String],
      summary: String,
      score: Number,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'interview', 'offered'],
      default: 'applied',
    },
    recruiterNotes: [String],
    interviewSchedule: {
      dateTime: Date,
      timezone: String,
      meetingLink: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Application', applicationSchema);


