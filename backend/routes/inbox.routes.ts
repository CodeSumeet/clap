import { Router } from "express";
import {
  getInboxes,
  createInbox,
  getInboxMessages,
  sendMessageToInbox,
} from "../controllers/inbox.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(isAuthenticated, getInboxes);
router.route("/:id").get(isAuthenticated, getInboxMessages);
router.route("/").post(isAuthenticated, createInbox);
router.route("/:id/messages").post(isAuthenticated, sendMessageToInbox);

export default router;
