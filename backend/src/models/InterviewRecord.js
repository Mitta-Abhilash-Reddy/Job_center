const mongoose = require('mongoose');

const interviewRecordSchema = new mongoose.Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidateAnswers: [String],
    score: Number,
    feedback: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('InterviewRecord', interviewRecordSchema);


