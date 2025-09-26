import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    try {
        const { JWT_SECRET_KEY } = process.env;

        if (!JWT_SECRET_KEY) {
            res.status(400).json({ message: "Secret key is not configured" });
        }

        const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "7d" });

        if (token) {
            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true, // prevent XSS attack
                sameSite: "strict", // prevent CSRF attack
                secure: process.env.NODE_ENV === "development" ? false : true, // http or https
            });

            return token;
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error While Generating Token",
            error: error.message,
        });
    }
};
export default generateToken;
