const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/metrics', authMiddleware, roleMiddleware(['admin']), adminController.getMetrics);
router.post('/moderate/job/:id', authMiddleware, roleMiddleware(['admin']), adminController.moderateJob);

module.exports = router;


