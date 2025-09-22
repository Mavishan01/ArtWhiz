import express from "express";
import { createPost, getAllPosts, getMyPosts } from '../controllers/Posts.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/getAllPosts', verifyToken, getAllPosts);
router.post('/createPost', verifyToken, createPost);
router.get('/getMyPosts', verifyToken, getMyPosts);

export default router;