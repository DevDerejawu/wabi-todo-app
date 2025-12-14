import express from 'express';
import { handleLogout } from '../controllers/controllerLogout.js';
const route = express.Router();
route.post("/logout", handleLogout);

export default route;