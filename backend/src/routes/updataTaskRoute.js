import { handleUpdatingTask } from "../controllers/controllerUpdateTask.js";
import authenticate from "../middlewares/protectedAuthRoute.js";
import express from 'express';

const route = express.Router();
route.patch("/update-task/:taskId", authenticate, handleUpdatingTask);

export default route;