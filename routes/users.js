import express from 'express';
import { getUserById, getUsers, postUpdateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/:id', postUpdateUser);

export default router;