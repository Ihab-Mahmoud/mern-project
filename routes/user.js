import express from "express";
import { validateUpdateUserInput } from "../middlewares/validation.js";
import upload from "../middlewares/multer.js";
import { checkForTestUser } from "../middlewares/auth.js";

import { authorizePermissions } from "../middlewares/auth.js";
const router = express();

import {
  getCurrentUser,
  UpdateUser,
  getAppStats,
} from "../controllers/user.js";

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getAppStats);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    UpdateUser
  );

export default router;
