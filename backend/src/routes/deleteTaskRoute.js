import authenticate from '../middlewares/protectedAuthRoute.js';
import { handleDeletingTask } from '../controllers/controllerDeleteTask.js';
import express from 'express';
const route = express.Router();
route.delete('/delete/:taskId', authenticate, handleDeletingTask);

export default route;