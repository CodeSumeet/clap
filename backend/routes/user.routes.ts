import { Router } from "express";
import {
  changePassword,
  getUser,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { parseFormData } from "../middlewares/parse.middleware";

const router = Router();

router.route("/").get(isAuthenticated, getUser);
router.route("/:userUid").get(isAuthenticated, getUserProfile);
router.route("/update").put(isAuthenticated, parseFormData, updateUser);
router
  .route("/changePassword")
  .put(isAuthenticated, parseFormData, changePassword);

export default router;
