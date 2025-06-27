import express from 'express';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

// User-signup
router.post('/signup', signup);
// User-login
router.post('/login', login);

export default router;
