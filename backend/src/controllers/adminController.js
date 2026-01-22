const Application = require('../models/Application');
const Job = require('../models/Job');

const getMetrics = async (req, res, next) => {
  try {
    const totalApplications = await Application.countDocuments();
    const stages = await Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const jobs = await Job.countDocuments();
    res.json({ totalApplications, stages, jobs });
  } catch (err) {
    next(err);
  }
};

const moderateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMetrics, moderateJob };


