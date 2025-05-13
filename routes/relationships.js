import express from 'express';
import { getFollowings, postAddRelationship, deleteRelationship, getFollowers } from '../controllers/relationships.js';

const router = express.Router();

router.get('/following/', getFollowings);
router.get('/follower/', getFollowers);
router.post('/', postAddRelationship);
router.delete('/', deleteRelationship)

export default router;