import "dotenv/config";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateToken from "../lib/jwt.utils.js";
import sendWelcomeEmail from "../emails/sendWelcomeEmail.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be at least 6 charactor",
            });
        }

        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

        if (!regex) {
            return res.status(400).json({ message: "invalid email format" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id, res);
        if (!token) return; // response already sent in token util

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            },
        });

        try {
            await sendWelcomeEmail(savedUser.email, savedUser.fullName);
        } catch (error) {
            console.log("Failed to send welcome email", error);
        }
    } catch (error) {
        console.error("error while user signup", error.message);
        return res.status(500).json({
            status: "failed",
            message: "Error while creating user",
            detailed: error.message,
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return res.status(400).json({ message: "invalid credientials" });

        if (!password)
            return res.status(400).json({ message: "invalid password" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(400).json({ message: "invalid credientials" });

        generateToken(user._id, res);

        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: { id: user._id, fullName: user.fullName, email: user.email },
        });
    } catch (error) {
        console.error("error while login user", error.message);
        return res.status(500).json({
            status: "failed",
            message: "error while login user",
            detailed: error,
        });
    }
};

export const logout = async (_req, res) => {
    await res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "User Logout Successfully" });
};
