import { addToTask } from "../models/modelAddToTask.js";
export async function handleAddingToTask(req, res) {
  try {
    const userId = req.user.userId;
    const { title, description, priority, timeQuantity, timeUnit, deadline } =
      req.body;

    if (
      !title ||
      !description ||
      !priority ||
      !timeQuantity ||
      !timeUnit ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Missing required fields",
        data: null,
        message: "Please provide all required task fields.",
      });
    }

    if (description.trim().length <= 10) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "unsatisfied data",
        data: null,
        message: "Please provide all required task fields with enough length.",
      });
    }

    const data = await addToTask(userId, {
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
    });

    const statusCode = data.status ?? (data.success ? 200 : 400);
  
    return res.status(statusCode).json(data);
  } catch (err) {
    
    return res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Internal server error.",
    });
  }
}
