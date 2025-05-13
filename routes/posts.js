import express from 'express';
import { deletePost, getPosts, getUserPosts, postAddPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', postAddPost)
router.get('/:id', getUserPosts);
router.delete('/:id', deletePost);



export default router;
// 