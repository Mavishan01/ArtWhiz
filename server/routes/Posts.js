import express from "express";
import { createPost, getAllPosts, getMyPosts, getPostStatsForHome } from '../controllers/Posts.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/getAllPosts', verifyToken, getAllPosts);
router.post('/createPost', verifyToken, createPost);
router.get('/getMyPosts', verifyToken, getMyPosts);
router.get('/getPostStatsForHome', getPostStatsForHome);

export default router;