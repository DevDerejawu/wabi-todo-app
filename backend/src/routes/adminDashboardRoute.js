import authenticate from "../middlewares/protectedAuthRoute.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import handleAdminDashboard from "../controllers/aminDashboardController.js";
import express from 'express';
const route = express.Router();
route.get("/dashboard", authenticate, adminMiddleware, handleAdminDashboard);

export default route;