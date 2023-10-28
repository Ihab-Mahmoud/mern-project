import express from "express";
import {
  validateRegisterInput,validateLoginInput
} from "../middlewares/validation.js";
const router = express();

import {
  Login,Register,Logout
} from "../controllers/auth.js";

router.route("/login").post(validateLoginInput,Login);
router.route("/register").post(validateRegisterInput,Register);
router.route("/logout").get(Logout);

export default router;
