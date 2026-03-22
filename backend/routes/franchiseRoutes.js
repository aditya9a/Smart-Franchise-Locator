const express = require('express');
const { getFranchises, getFranchiseById, addFranchise } = require('../controllers/franchiseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getFranchises);
router.get('/:id', getFranchiseById);
router.post('/', auth, addFranchise);

module.exports = router;
