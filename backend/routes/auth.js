import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Register route (admin only in production)
router.post('/register', register);

export default router;

