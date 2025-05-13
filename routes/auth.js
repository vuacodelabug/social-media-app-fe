import express from 'express';
import { login, logout, register, verifyAccount, authenticate } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyAccount);
router.get('/authenticate', authenticate);


export default router;