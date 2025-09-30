import express from "express";
import { generateImage } from "../controllers/generateImage.js";
import { verifyToken } from "../middleware/authMiddleware.js";
// import { img } from "../controllers/generateImage.js";

const router = express.Router();

router.post('/', verifyToken, generateImage);
// router.post('/img', img);

export default router;