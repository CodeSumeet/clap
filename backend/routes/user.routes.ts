import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/auth/register").post(upload.single("avatar"), registerUser);
router.route("/auth/login").post(upload.any(), loginUser);
router.route("/auth/logout").post(logoutUser);

export default router;
