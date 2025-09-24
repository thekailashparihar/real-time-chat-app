import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            res.status(400).json({
                message: "Secret key not found in environment variable",
            });
        }

        const token = jwt.sign({ userId }, secretKey, {
            expiresIn: "7d",
        });

        // prettier-ignore
        if (token) {
            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,        // In Milisecond
                httpOnly: true,                         // prevent XSS attack
                sameSite: "strict",                     // prevent CSRF attack
                secure: process.env.NODE_ENV === "development" ? false : true,  // http or https
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
