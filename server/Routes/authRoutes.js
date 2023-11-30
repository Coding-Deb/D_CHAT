// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send_chat', authController.sendChat);
router.get('/get_chats', authController.receiveChats);
router.get('/login',authController.getUsernameFromToken)
router.get('/users',authController.getAllUsernamesExceptLoggedInUser)
router.put('/update',authController.updateUserNamePassword)


module.exports = router;
