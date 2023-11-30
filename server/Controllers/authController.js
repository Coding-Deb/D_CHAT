const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model')
const Chat = require('../Models/chat.model')

// Configure Cloudinary with your API key, API secret, and cloud name
cloudinary.config({
  cloud_name: 'dbbjsrztd',
  api_key: '665347456443981',
  api_secret: 'GVmkrVkTkuhiH8qX8HNsaJ7PXSc'
});


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if an image file is included in the request
    const user = new User({
      username,
      email,
      password: hashedPassword,

    });

    await user.save();

    res.json({ message: 'Registration successful' });

  } catch (error) {
    res.status(500).json({ rror: 'Internal Server Error' + error });
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
    res.json({msg: 'Sent'});
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
      return res.status(400).json({ error: 'SenderId and ReceiverId are required' });
    }

    // Fetch chats where either the senderId or receiverId matches the logged-in user
    const chats = await Chat.find({
      $or: [
        { senderId: loggedInUserId, receiverId },
        { senderId: receiverId, receiverId: loggedInUserId },
      ],
    });

    // Respond with the chats
    res.json({ message: chats });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
