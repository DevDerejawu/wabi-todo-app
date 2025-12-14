import { handleGettingUserProfile } from "../controllers/controllerGetProfile.js";
import authenticate from "../middlewares/protectedAuthRoute.js";
import express from 'express';
const route = express.Router();
route.get("/profile", authenticate, handleGettingUserProfile);
export default route;