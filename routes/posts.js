import express from 'express';
import { deletePost, getPosts, getUserPosts, postAddPost, getSearch } from '../controllers/posts.js';

const router = express.Router();

router.get('/search-form', getSearch)
router.get('/', getPosts);
router.post('/', postAddPost)
router.get('/:id', getUserPosts);
router.delete('/:id', deletePost);

export default router;
// 