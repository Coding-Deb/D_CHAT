const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model')
const Chat = require('../Models/chat.model')
const Post = require('../Models/post.model')
const multer = require('multer');

// Configure Cloudinary with your API key, API secret, and cloud name
cloudinary.config({
  cloud_name: 'dbbjsrztd',
  api_key: '665347456443981',
  api_secret: 'GVmkrVkTkuhiH8qX8HNsaJ7PXSc'
});

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let img_url = ''; // Initialize img_url variable
    // Check if an image file is included in the request
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'public' // Update with the desired folder name
      });

      img_url = result.secure_url; // Save the secure URL of the uploaded image
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,

    });

    await user.save();

    res.json({ message: 'Registration successful' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Token generation only if the user and password are valid
    const token = jwt.sign({ userId: user._id, username: user.username }, 'Debanshu', { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUsernameFromToken = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the user based on the decoded token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the username
    res.json({ username: user.username, logged_id: user._id });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsernamesExceptLoggedInUser = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUser = await User.findById(decodedToken.userId);

    if (!loggedInUser) {
      return res.status(404).json({ error: 'Logged-in user not found' });
    }

    // Fetch all users except the logged-in user
    const allUsersExceptLoggedInUser = await User.find({ _id: { $ne: loggedInUser._id } });

    // Extract usernames from the users
    const usernames = allUsersExceptLoggedInUser.map(user => ({ username: user.username, _id: user._id }));

    // Respond with the usernames
    res.json({ usernames });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUserNamePassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the user based on the decoded token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the username and/or password
    if (username) {
      user.username = username;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    res.json({ message: 'Username and/or password updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sendChat = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newChat = new Chat({
      senderId,
      receiverId,
      message,
    });

    await newChat.save();
    // Push the chat message to the sender's and receiver's data
    await User.findByIdAndUpdate(senderId, { $push: { chats: newChat._id } });
    await User.findByIdAndUpdate(receiverId, { $push: { chats: newChat._id } });
    res.json({ msg: 'Sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.receiveChats = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    const { senderId, receiverId } = req.body;

    // Validate that the provided senderId and receiverId are not empty
    if (!senderId || !receiverId) {
      return res.json({ message: 'SenderId and ReceiverId are required' });
    }

    // Fetch chats where both the senderId and receiverId match the logged-in user
    const chats = await Chat.find({
      $or: [
        { senderId: loggedInUserId, receiverId },
        { senderId: receiverId, receiverId: loggedInUserId },
      ],
    });

    // Respond with the chats
    res.json({ chats });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// controllers/user.controller.js

exports.sendPost = async (req, res) => {
  const { postText } = req.body;

  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Create a new post
    const newPost = new Post({
      userId: loggedInUserId,
      postText,
      // Add other fields as needed
    });

    // Save the post to the database
    await newPost.save();

    // Update the user's posts array with the newly created post ID
    await User.findByIdAndUpdate(loggedInUserId, { $push: { posts: newPost._id } });

    // Respond with a success message or the newly created post
    res.json({ message: 'Post sent successfully', post: newPost });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

// controllers/user.controller.js

exports.receivePosts = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Fetch posts for the logged-in user
    const posts = await Post.find({ userId: loggedInUserId }).populate('userId', 'username');

    // Respond with the posts
    res.json({ posts });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

exports.receiveAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.json({ posts })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
}
exports.search = async (req, res) => {
  try {
    const { query } = req.params;

    // Search for users with matching username
    const userResults = await User.find({ username: { $regex: query, $options: 'i' } });

    // Search for posts with matching text
    const postResults = await Post.find({ postText: { $regex: query, $options: 'i' } })
      .populate('userId', 'username');

    // Search for chats with matching message
    const chatResults = await Chat.find({ message: { $regex: query, $options: 'i' } })
      .populate('senderId', 'username') // Populate senderId with username
      .populate('receiverId', 'username'); // Populate receiverId with username

    const alldata = [...userResults,...chatResults,...postResults]
    // res.json({ userResults, postResults, chatResults });
    res.json({userResults:userResults,chatResults:chatResults,postResults:postResults})
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

exports.followUser = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Extract the user ID to follow from the request parameters
    const { userIdToFollow } = req.params;

    // Check if the user to follow exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User to follow not found' });
    }

    // Check if the user is already following the target user
    if (loggedInUserId === userIdToFollow) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    // Check if the user is already following the target user
    const isFollowing = await User.findOne({
      _id: loggedInUserId,
      following: { $in: [userIdToFollow] }
    });

    if (isFollowing) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Update the logged-in user's following array with the target user's ID
    await User.findByIdAndUpdate(loggedInUserId, { $push: { following: userIdToFollow } });

    // Update the target user's followers array with the logged-in user's ID
    await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: loggedInUserId } });

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Fetch the logged-in user's followers
    const followers = await User.findById(loggedInUserId, 'followers').populate('followers', 'username');

    res.json({ followers: followers.followers });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Fetch the logged-in user's following
    const following = await User.findById(loggedInUserId, 'following').populate('following', 'username');

    res.json({ following: following.following });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};

// controllers/user.controller.js

exports.unfollowUser = async (req, res) => {
  try {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'Debanshu');

    // Fetch the logged-in user based on the decoded token
    const loggedInUserId = decodedToken.userId;

    // Extract the user ID to unfollow from the request parameters
    const { userIdToUnfollow } = req.params;

    // Check if the user to unfollow exists
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User to unfollow not found' });
    }

    // Check if the user is trying to unfollow themselves
    if (loggedInUserId === userIdToUnfollow) {
      return res.status(400).json({ error: 'You cannot unfollow yourself' });
    }

    // Check if the user is currently following the target user
    const isFollowing = await User.findOne({
      _id: loggedInUserId,
      following: { $in: [userIdToUnfollow] }
    });

    if (!isFollowing) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    // Remove the target user's ID from the logged-in user's following array
    await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userIdToUnfollow } });

    // Remove the logged-in user's ID from the target user's followers array
    await User.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: loggedInUserId } });

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};
