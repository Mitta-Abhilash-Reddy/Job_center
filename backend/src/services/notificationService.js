const Notification = require('../models/Notification');

const createNotification = async ({ userId, message, type }, io) => {
  const notification = await Notification.create({ userId, message, type });
  if (io) {
    io.to(userId.toString()).emit('notification', notification);
  }
  return notification;
};

const getMyNotifications = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

module.exports = { createNotification, getMyNotifications };


