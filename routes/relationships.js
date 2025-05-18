import express from 'express';
import { getFollowings, postAddRelationship, deleteRelationship, getFollowers, checkFollow } from '../controllers/relationships.js';

const router = express.Router();

router.get('/following/', getFollowings);
router.get('/follower/', getFollowers);
router.post('/', postAddRelationship);
router.delete('/', deleteRelationship)
router.get('/check', checkFollow)


export default router;