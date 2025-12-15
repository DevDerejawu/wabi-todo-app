import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/db.js";

async function getLatestTask(userId) {
  try {
    const sql = `
      SELECT title, status, deadline 
      FROM tasks 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 5
    `;

    const [rows] = await db.query(sql, [userId]);

    if (rows.length > 0) {
      return {
        success: true,
        status: 200,
        error: null,
        data: rows,
        message: "Latest tasks fetched successfully.",
      };
    }

    return {
      success: false,
      status: 404,
      error: "No tasks found",
      data: [],
      message: "The user has no tasks yet.",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Internal server error while fetching latest tasks.",
    };
  }
}

export { getLatestTask };
