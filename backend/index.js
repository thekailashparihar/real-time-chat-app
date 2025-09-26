import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.routes.js";
import messageRoutes from "./src/routes/message.routes.js";

import { establishDBConnection } from "./src/lib/db.config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 3000;

const startServer = async () => {
    await establishDBConnection();
    app.listen(port, () => {
        console.log(`\nserver is start running at http://localhost:${port}`);
    });
};
startServer();
