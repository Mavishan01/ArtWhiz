import express from "express";
import { createPost, getAllPosts } from '../controllers/Posts.js';

const router = express.Router();

router.get('/getAllPosts', getAllPosts);
router.post('/createPost', createPost);

export default router;