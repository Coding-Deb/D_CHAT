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
router.get('/search/:query',authController.search)
router.post('/follow/:userIdToFollow',authController.followUser)
router.post('/unfollow/:userIdToUnfollow',authController.unfollowUser)
router.get('/getfollowing',authController.getFollowing)
router.get('/getfollower',authController.getFollowers)
router.get('/checkFollowing/:userIdToCheck',authController.checkIfUserIsFollowing)
router.get('/:userId', authController.getNotifications);
 
module.exports = router;
