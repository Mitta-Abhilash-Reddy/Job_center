const Application = require('../models/Application');

const scheduleInterview = async (req, res, next) => {
  try {
    const { applicationId, dateTime, timezone, meetingLink } = req.body;
    const app = await Application.findByIdAndUpdate(
      applicationId,
      { interviewSchedule: { dateTime, timezone, meetingLink }, status: 'interview' },
      { new: true },
    );
    res.json(app);
  } catch (err) {
    next(err);
  }
};

const getInterview = async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id);
    res.json(app?.interviewSchedule || {});
  } catch (err) {
    next(err);
  }
};

module.exports = { scheduleInterview, getInterview };


