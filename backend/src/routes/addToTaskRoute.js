import authenticate from "../middlewares/protectedAuthRoute.js";
import { handleAddingToTask } from "../controllers/controllerAddToTask.js";

import express from 'express';

const route = express.Router();

route.post("/add-new-task", authenticate, handleAddingToTask);

export default route;
