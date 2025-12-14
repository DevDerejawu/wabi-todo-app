import {
  handleGettingTasksByStatus,
  handleGettingTasksByPriority,
  handleGettingTasksByPosted,
  handleGettingTasksByUpdated,
  handleGettingTasksByDeleted,
} from "../controllers/controllerDynamicTask.js";
import authenticate from "../middlewares/protectedAuthRoute.js";
import express from "express";

const route = express.Router();

route.use(authenticate);

// Status endpoints
route.get("/status/:status",   handleGettingTasksByStatus);

// Priority endpoints
route.get("/priority/:priority", handleGettingTasksByPriority);

// Posted / Updated / Deleted filters
route.get("/posted", handleGettingTasksByPosted);
route.get("/updated", handleGettingTasksByUpdated);
route.get("/deleted", handleGettingTasksByDeleted);

export default route;
