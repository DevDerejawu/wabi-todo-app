import { deleteTask } from "../models/modelDeleteTask.js";
async function handleDeletingTask(req, res) {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const data = await deleteTask(taskId, userId);

    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error at time of deleting.",
    });
  }
}

export { handleDeletingTask };
