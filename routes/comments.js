import express from 'express';
import { deleteComment, getComments, postAddComment } from '../controllers/comments.js';
const router = express.Router();

router.get('/', getComments);
router.post('/', postAddComment);
router.delete('/:id', deleteComment);

export default router;