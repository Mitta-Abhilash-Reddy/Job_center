const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, roleMiddleware(['candidate']), applicationController.getMyApplications);
router.put('/:id/status', authMiddleware, roleMiddleware(['recruiter', 'admin']), applicationController.updateStatus);

module.exports = router;


