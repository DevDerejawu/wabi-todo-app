import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(
  "/profile-pictures/images/profiles",
  express.static(path.join(__dirname, "profilePictures", "images"))
);
app.use(express.json());

app.use(
  cors({
    origin: "https://wabi-todo-app-1.onrender.com",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

//import verifyEmailRoute from "./src/routes/verifyEmailRoute.js";
import authRoute from "./src/routes/authRoute.js";
import dashboardRoute from "./src/routes/dashboardRoute.js";
import logoutRoute from "./src/routes/logoutRoute.js";
import statisticsRoute from "./src/routes/statisticsRoute.js";
import deleteRoute from "./src/routes/deleteTaskRoute.js";
import updateRoute from "./src/routes/updataTaskRoute.js";
import dropdownRoute from "./src/routes/dropdownTaskRoute.js";
import latestRoute from "./src/routes/latestTaskRoute.js";
import addTotaskRoute from "./src/routes/addToTaskRoute.js";
import dynamicTaskRoute from "./src/routes/dynamicTaskRoute.js";
import getProfileRoute from "./src/routes/getProfileRoute.js";
import profileMeRoute from "./src/routes/profileMeRoute.js";
import adminRoute from "./src/routes/adminDatabseRelatedRoute.js";
import adminDashboardRoute from "./src/routes/adminDashboardRoute.js";

//app.use("/api/auth", verifyEmailRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth", dashboardRoute);
app.use("/api/auth", logoutRoute);
app.use("/tasks", statisticsRoute);
app.use("/tasks", deleteRoute);
app.use("/tasks", updateRoute);
app.use("/tasks", dropdownRoute);
app.use("/tasks", latestRoute);
app.use("/tasks", addTotaskRoute);
app.use("/tasks", dynamicTaskRoute);
app.use("/dashboard", getProfileRoute);
app.use("/profile", profileMeRoute);
app.use("/admin", adminRoute);
app.use("/admin", adminDashboardRoute);
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "frontend", "pages/404.html"));
});

const PORT = process.env?.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(`Server is listening on ${PORT}`);
});
