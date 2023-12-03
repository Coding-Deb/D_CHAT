// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send_chat', authController.sendChat);
router.get('/receiveChats', authController.receiveChats);
router.get('/login',authController.getUsernameFromToken)
router.get('/users',authController.getAllUsernamesExceptLoggedInUser)
router.put('/update',authController.updateUserNamePassword)
router.post('/send_post',authController.sendPost)
router.get('/receive_post',authController.receivePosts)
router.get('/receive_all_post',authController.receiveAllPosts)
router.delete('/delete_post',authController.receiveAllPosts)

 
module.exports = router;
