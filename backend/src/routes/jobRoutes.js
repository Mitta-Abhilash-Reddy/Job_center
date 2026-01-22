const express = require('express');
const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['recruiter', 'admin']), jobController.createJob);
router.get('/', jobController.listJobs);
router.get('/:id', jobController.getJob);
router.post('/:id/apply', authMiddleware, roleMiddleware(['candidate']), applicationController.applyForJob);
router.get('/:id/applicants', authMiddleware, roleMiddleware(['recruiter', 'admin']), applicationController.getApplicantsForJob);
router.put('/:id', authMiddleware, roleMiddleware(['recruiter', 'admin']), jobController.updateJob);
router.delete('/:id', authMiddleware, roleMiddleware(['recruiter', 'admin']), jobController.deleteJob);

module.exports = router;


