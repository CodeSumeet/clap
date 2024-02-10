import { Router } from "express";
import { sendMessage } from "../controllers/message.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);

export default router;
