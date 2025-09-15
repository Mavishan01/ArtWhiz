import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImage from "./routes/generateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "There is an error";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.use('/api/post', PostRouter);
app.use('/api/generateImage', GenerateImage);

app.get('/', async(req, res) => {
    res.status(200).json({
        message: "hello world",
    });
});

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect");
    console.error(err);
    process.exit(1); // stop server if DB fails
  }
};

// server start
const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log('server started on port 8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();