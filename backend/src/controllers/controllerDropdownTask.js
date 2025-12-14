import { getAllTasksForDropdown } from "../models/modelForDropdown.js";

async function handleDropdownTask(req, res) {
  try {
    const { userId } = req.user;
    const data = await getAllTasksForDropdown(userId);
    const statusCode = data.status || data.success ? 200 : 400;
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

export { handleDropdownTask };
