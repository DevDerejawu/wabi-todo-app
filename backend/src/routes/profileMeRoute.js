import authenticate from "../middlewares/protectedAuthRoute.js";
import { validatePassword } from "../middlewares/validatePassword.js";
import { validateName } from "../middlewares/validateName.js";
import { HandleProfileMe } from "../controllers/controllerProfileMe.js";
import { upload } from "../middlewares/filterImages.js";
import express from "express";

const route = express.Router();
route.patch(
  "/me",
  authenticate,
   upload.single("profile-picture"),
  validateName(false),
  validatePassword(false),
  HandleProfileMe
);

export default route;
