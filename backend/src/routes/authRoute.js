import {
  handleRegisteringUser,
  handleLoggingIn,
} from "../controllers/authControllers.js";
import express from "express";
import { validateEmail } from "../middlewares/validateEmail.js";
import { validateName } from "../middlewares/validateName.js";
import { validatePassword } from "../middlewares/validatePassword.js";

const router = express.Router();
router.post(
  "/register",
  validateEmail(true),
  validateName(true),
  validatePassword(true),
  handleRegisteringUser
);
router.post(
  "/login",
  validateEmail(true),
  validatePassword(true),
  handleLoggingIn
);
export default router;
