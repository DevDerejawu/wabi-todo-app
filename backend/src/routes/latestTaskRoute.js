import { handleLatestTask } from "../controllers/controllerLatestTask.js";
import authenticate from "../middlewares/protectedAuthRoute.js";
import express from 'express';
const route = express.Router();
route.get("/latest", authenticate, handleLatestTask);
export default route;
