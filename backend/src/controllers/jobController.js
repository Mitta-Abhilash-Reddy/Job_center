const Job = require('../models/Job');

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, companyId: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

const listJobs = async (req, res, next) => {
  try {
    const filters = req.query || {};
    const jobs = await Job.find(filters);
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, listJobs, getJob, updateJob, deleteJob };


