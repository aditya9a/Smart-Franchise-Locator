const express = require('express');
const { getApplications, createApplication, updateApplicationStatus } = require('../controllers/applicationController');
const router = express.Router();

router.get('/', getApplications);
router.post('/', createApplication);
router.patch('/:id', updateApplicationStatus);

module.exports = router;
