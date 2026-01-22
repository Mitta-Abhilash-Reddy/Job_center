const express = require('express');
const interviewController = require('../controllers/interviewController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/schedule', authMiddleware, roleMiddleware(['recruiter', 'admin']), interviewController.scheduleInterview);
router.get('/:id', authMiddleware, interviewController.getInterview);

module.exports = router;


