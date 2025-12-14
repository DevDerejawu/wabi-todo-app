import db from "../../config/db.js";

async function updateTask(userId, taskId, body) {
  try {
    const {
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
      status,
    } = body;

    const sql = `
      UPDATE tasks
      SET title = ?, content = ?, priority = ?, time_quantity = ?, time_unit = ?, deadline = ?, status = ?
      WHERE id = ? AND user_id = ?
    `;

    const [result] = await db.query(sql, [
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
      status,
      taskId,
      userId,
    ]);

    if (result.affectedRows === 1) {
      return {
        success: true,
        status: 200,
        error: null,
        data: null,
        message: "You have successfully updated your task!",
      };
    }

    return {
      success: false,
      status: 400,
      error: "Unknown update error",
      data: null,
      message: "Unable to update the task.",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Internal server error during task update.",
    };
  }
}

export { updateTask };
