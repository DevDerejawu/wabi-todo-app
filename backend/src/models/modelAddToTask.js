import db from "../../config/db.js";

export async function addToTask(userId, body) {
  try {
    const { title, description, priority, timeQuantity, timeUnit, deadline } =
      body;

    if (!userId) {
      return {
        success: false,
        status: 401,
        error: "unauthorized",
        data: null,
        message: "User not authenticated.",
      };
    }

    const sql = `
      INSERT INTO tasks(user_id, title, content, priority, time_quantity, time_unit, deadline) VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      userId,
      title,
      description,
      priority,
      timeQuantity,
      timeUnit,
      deadline,
    ]);

    if (result.insertId) {
      return {
        success: true,
        status: 201,
        error: null,
        data: null,
        message: "You have successfully created your task!",
      };
    }

    return {
      success: false,
      status: 400,
      error: "Unknown error",
      data: null,
      message: "Unable to add the task.",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Internal server error.",
    };
  }
}
