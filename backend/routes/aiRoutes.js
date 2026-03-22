const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/chat', auth, chatWithAI);

module.exports = router;
