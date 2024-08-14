const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('Invalid request data');
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Register successful', user });
    } else {
      res.status(400).send('User already exists, try to login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password required');
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();
      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });

    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token refresh failed', error });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'User logout failed', error });
  }
};

module.exports = { registerUser, authUser, refreshToken, logout };


