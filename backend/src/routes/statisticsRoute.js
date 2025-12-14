import express from 'express';
import authenticate from '../middlewares/protectedAuthRoute.js';
import {handleGettingStatisticsData } from '../controllers/controllerStatistics.js';

const route = express.Router();
route.get("/statistics/dashboard", authenticate, handleGettingStatisticsData);

export default route;


