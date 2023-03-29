const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { login, register, getCurrentUserData, updateCurrentUserData } = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.get('/me', authMiddleware, getCurrentUserData);
router.patch('/me', authMiddleware, updateCurrentUserData);

module.exports = router;