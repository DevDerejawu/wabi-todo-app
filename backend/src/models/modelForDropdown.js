import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/db.js";

async function getAllTasksForDropdown(userId) {
  try {
    const sql = `SELECT * FROM tasks WHERE user_id = ?`;
    const [rows] = await db.query(sql, [userId]);

    if (rows.length > 0) {
      return {
        success: true,
        status: 200,
        error: null,
        data: rows,
        message: "Your tasks are ready for dropdown.",
      };
    }

    return {
      success: false,
      status: 404,
      error: "No tasks found",
      data: [],
      message: "There are no tasks for this user.",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Internal server error while fetching tasks.",
    };
  }
}

export {getAllTasksForDropdown};
