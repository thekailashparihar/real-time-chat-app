import User from "../models/user.model.js";
import generateToken from "../lib/jwt.utils.js";

import bcrypt from "bcryptjs";

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

        if (newUser) {
            generateToken(newUser._id, res);

            await newUser.save();

            return res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                },
            });
        } else {
            return res.status(400).json({
                message: "Invalid user data",
            });
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
export const login = (req, res) => {
    res.send("login endpoint");
};

export const logout = (req, res) => {
    res.send("logout endpoint");
};
