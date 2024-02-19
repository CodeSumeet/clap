import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import { parseFormData } from "../middlewares/parse.middleware";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(parseFormData, loginUser);
router.route("/logout").post(logoutUser);
router.route("/refreshToken").post(refreshToken);
router.route("/resetPassword").post(resetPassword);

export default router;
