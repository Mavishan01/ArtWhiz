import mongoose from "mongoose";
import User from "./Users.js";

const PostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;