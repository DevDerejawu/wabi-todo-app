import { updateTask } from "../models/modelUpdateTask.js";

async function handleUpdatingTask(req, res) {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const {
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
      status,
    } = req.body;
    const body = {
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
      status,
    };
    const data = await updateTask(userId, taskId, body);
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error at time of updating.",
    });
  }
}

export { handleUpdatingTask };
