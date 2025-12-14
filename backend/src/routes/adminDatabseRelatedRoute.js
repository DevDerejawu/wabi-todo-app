import express from "express";
import { adminController } from "../controllers/controllerAdminDatabaseRelated.js";
import authenticate from "../middlewares/protectedAuthRoute.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/total-users", authenticate, adminMiddleware, adminController.totalUsers);
router.get("/total-tasks", authenticate, adminMiddleware, adminController.totalTasks);
router.get("/users-list", authenticate, adminMiddleware, adminController.usersList);
router.get("/tasks-list", authenticate, adminMiddleware, adminController.tasksList);
router.delete("/delete-user/:email", authenticate, adminMiddleware, adminController.deleteUser);

export default router;
