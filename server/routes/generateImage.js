import express from "express";
import { generateImage } from "../controllers/generateImage.js";
// import { img } from "../controllers/generateImage.js";

const router = express.Router();

router.post('/', generateImage);
// router.post('/img', img);

export default router;