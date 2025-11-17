import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('creator');
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        next(error);
    }
}

export const createPost = async (req, res, next) => {
    try {
        let { prompt, image, style, aspectRatio } = req.body;
        const id = req?.user?.id;

        style = style?.trim() || 'General';
        style = style.charAt(0).toUpperCase() + style.slice(1);

        const imageUrl = await cloudinary.uploader.upload(image);
        console.log('Image uploaded to Cloudinary');

        const newPost = await Post.create({
            creator: id,
            prompt,
            imageUrl: imageUrl.secure_url,
            style,
            aspectRatio,
        });
        console.log('Post saved in mongodb');

        return res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        console.error('❌ Error in createPost:', error);
        next(error);
    }
}

export const getMyPosts = async (req, res, next) => {
    try {
        const creator = req?.user?.id;
        const posts = await Post.find({creator}).populate('creator');

        // posts.forEach(post => {
        //     console.log('creator:', post.creator);
        // });

        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        next(error);
    }
}

export const getPostStatsForHome = async (req, res, next) => {
    try {
       const stats = await Post.aggregate([
        {
            $facet: {
            totalPosts: [{ $count: "count" }],
            uniqueCreators: [
                { $group: { _id: "$creator" } },
                { $count: "count" }
            ],
            uniqueStyles: [
                { $group: { _id: "$style" } },
                { $count: "count" }
            ]
            }
        }
    ]);

    // Extract counts safely with fallback values
    const result = {
      totalPosts: stats[0]?.totalPosts?.[0]?.count || 0,
      uniqueCreators: stats[0]?.uniqueCreators?.[0]?.count || 0,
      uniqueStyles: stats[0]?.uniqueStyles?.[0]?.count || 0
    };

    console.log(result);

    // Send JSON response
    res.status(200).json({
      success: true,
      data: result
    });

    } catch (error) {
        console.error("Error fetching post stats:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Could not fetch post stats",
            error: error.message
        });
    }
};