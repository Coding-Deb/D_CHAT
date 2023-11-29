const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model')


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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
  
      const token = jwt.sign({ userId: user._id,  username: user.username }, 'Debanshu', { expiresIn: '7d' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };