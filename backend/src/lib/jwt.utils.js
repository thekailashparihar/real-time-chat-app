import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const { JWT_SECRET_KEY } = process.env;

    if (!JWT_SECRET_KEY) {
        return res
            .status(500)
            .json({ message: "Secret key is not configured" });
    }
    try {
        const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "7d" });

        const cookieOptions = {
            maxAge: 1000 * 60 * 60, // Cookie valid for 1 hour
            httpOnly: true, // Cookie not accessible via JavaScript
            secure: process.env.NODE_ENV === "development" ? false : true, // Cookie sent only over HTTPS
            domain: process.env.DOMAIN, // Domain for which cookie is valid
            path: "/", // Cookie valid for all routes
            sameSite: "Strict", // Allow cross-site cookie
        };

        if (token) {
            res.cookie("jwt", token, cookieOptions);

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
