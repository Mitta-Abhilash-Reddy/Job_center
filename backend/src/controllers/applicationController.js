const Application = require('../models/Application');
const Job = require('../models/Job');
const notificationService = require('../services/notificationService');

const applyForJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    const application = await Application.create({
      jobId,
      candidateId: req.user._id,
      resumeSnapshot: req.body.resumeSnapshot,
    });
    job.metadata.applicantsCount += 1;
    await job.save();
    await notificationService.createNotification(
      { userId: job.companyId, message: 'New applicant', type: 'application' },
      req.app.get('io'),
    );
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
};

const getMyApplications = async (req, res, next) => {
  try {
    const apps = await Application.find({ candidateId: req.user._id }).populate('jobId');
    res.json(apps);
  } catch (err) {
    next(err);
  }
};

const getApplicantsForJob = async (req, res, next) => {
  try {
    const apps = await Application.find({ jobId: req.params.id }).populate('candidateId');
    res.json(apps);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (app) {
      await notificationService.createNotification(
        { userId: app.candidateId, message: `Application ${app.status}`, type: 'status' },
        req.app.get('io'),
      );
    }
    res.json(app);
  } catch (err) {
    next(err);
  }
};

module.exports = { applyForJob, getMyApplications, getApplicantsForJob, updateStatus };


