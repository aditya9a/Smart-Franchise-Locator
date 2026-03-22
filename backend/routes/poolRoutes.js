const express = require('express');
const { getPools, joinPool, createPool } = require('../controllers/poolController');
const router = express.Router();

router.get('/', getPools);
router.post('/join', joinPool);
router.post('/', createPool);

module.exports = router;
