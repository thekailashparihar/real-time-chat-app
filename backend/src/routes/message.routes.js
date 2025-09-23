import express from "express";

import { receive, send } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/send", send);
router.get("/receive", receive);

export default router;
