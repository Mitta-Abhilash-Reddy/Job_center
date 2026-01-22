const notificationService = require('../services/notificationService');

const getMyNotifications = async (req, res, next) => {
  try {
    const list = await notificationService.getMyNotifications(req.user._id);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMyNotifications };


