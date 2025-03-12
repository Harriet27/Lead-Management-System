const express = require('express');
const { login, register } = require('../controllers/authController.js');

const router = express.Router();

// Login route
router.post('/login', login);

// Register route (admin only in production)
router.post('/register', register);

module.exports = router;

