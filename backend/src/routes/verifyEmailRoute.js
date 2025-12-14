//I implemented email functionality because I wanted to send a verification email when users sign up. However, sending emails securely requires handling several security-related configurations, such as proper credential management, app passwords, and environment variables. Since this project is currently for learning purposes, I decided to temporarily leave the email feature aside and focus on the core functionality. I plan to revisit and implement it properly with full security measures later.
import express from 'express';
import { handleEmailVerifying } from '../controllers/controllerVerifyEmail.js';
const router = express.Router();
router.post('/verify', handleEmailVerifying);
export default router;
