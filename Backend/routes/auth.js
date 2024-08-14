const express = require('express');
const { registerUser, authUser, refreshToken, logout } = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate user and get tokens
router.post('/login', authUser);

// Refresh access token
router.post('/token', refreshToken);

// Logout user
router.post('/logout', logout);

module.exports = router;
