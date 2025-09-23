import dotenv from "dotenv";
import express from "express";

import authRoutes from "./src/routes/auth.routes.js";
import messageRoutes from "./src/routes/message.routes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, Welcome to WeChat");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`\nserver is start running at http://localhost:${port}`);
});
