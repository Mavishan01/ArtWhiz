import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        //user duplication check
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already in use",
        });
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({
            success: true,
            data: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user in this email",
            });
        }

        //password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        //JWT
        const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
        );

        const decoded = jwt.decode(token);
        console.log("Issued at:", new Date(decoded.iat * 1000));
        console.log("Expires at:", new Date(decoded.exp * 1000));

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({
            success: true,
            data: userWithoutPassword,
            message: "Logged in successfully",
            token,
        });

    } catch (error) {
        next(error);
    }
}