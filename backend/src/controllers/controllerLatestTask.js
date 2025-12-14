import { getLatestTask } from "../models/modelLatestTask.js";
async function handleLatestTask(req, res) {
  try {
    const { userId } = req.user;
    const data = await getLatestTask(userId);
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

export { handleLatestTask };
