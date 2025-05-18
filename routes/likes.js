import express from 'express';
import { getLikes, postAddLike, deleteLike } from '../controllers/likes.js';

const router = express.Router();

router.get('/', getLikes);
router.post('/', postAddLike);
router.delete('/', deleteLike)

export default router;