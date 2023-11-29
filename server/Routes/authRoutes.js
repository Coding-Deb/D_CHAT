// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authenticateToken = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
