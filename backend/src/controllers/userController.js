const path = require('path');
const User = require('../models/User');
const { parseResume } = require('../services/resumeParser');

const getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'File is required' });
    const filePath = req.file.path;
    const resumeUrl = `/uploads/${path.basename(filePath)}`;
    const parsedResume = await parseResume(filePath, req.file.originalname);

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'profile.resumeUrl': resumeUrl,
          'profile.resumeSnapshot': parsedResume,
        },
      },
      { new: true },
    );

    res.json({
      message: 'Resume uploaded and parsed',
      resumeUrl,
      parsedResume,
      user: updated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe, uploadResume };


