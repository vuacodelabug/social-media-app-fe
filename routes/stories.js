import express from 'express';
import { deleteStory, getStories, postAddStories } from '../controllers/stories.js';

const router = express.Router();

router.get('/', getStories);
router.post('/', postAddStories)
router.delete('/:id', deleteStory);



export default router;
// 