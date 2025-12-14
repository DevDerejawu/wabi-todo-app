import authenticate from "../middlewares/protectedAuthRoute.js";
import { handleDropdownTask } from "../controllers/controllerDropdownTask.js";
import express from 'express';
const route = express.Router();

route.get('/get-all',authenticate, handleDropdownTask);

export default route;