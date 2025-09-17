import User from "../models/Users.js";
import bcrypt from "bcrypt";

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