import express from 'express';
import {dashboardInHome} from '../controllers/controllerDashboard.js';
import authenticate from '../middlewares/protectedAuthRoute.js';
const route = express.Router();

route.get("/dashboard", authenticate, dashboardInHome);

export default route;