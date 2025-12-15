import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/db.js";

const dynamicTaskModel = {
  async fetchByStatus(userId, status) {
    try {
      const sql = `SELECT * FROM tasks WHERE user_id = ? AND status = ?`;
      const [rows] = await db.query(sql, [userId, status]);

      if (rows.length > 0) {
        return {
          success: true,
          status: 200,
          data: rows,
          message: `Tasks with status "${status}" fetched successfully, scroll at the bottom.`,
          error: null,
        };
      }

      return {
        success: false,
        status: 404,
        data: rows,
        message: `You don't have "${status}" tasks in your database.`,
        error: "No task",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        data: null,
        message: `Failed to fetch tasks with status "${status}"`,
        error: err.message,
      };
    }
  },

  async fetchByPriority(userId, priority) {
    try {
      const sql = `SELECT * FROM tasks WHERE user_id = ? AND priority = ?`;
      const [rows] = await db.query(sql, [userId, priority]);

      if (rows.length > 0) {
        return {
          success: true,
          status: 200,
          data: rows,
          message: `Tasks with priority "${priority}" fetched successfully, scroll at the bottom.`,
          error: null,
        };
      }

      return {
        success: false,
        status: 404,
        data: rows,
        message: `You don't have "${priority}" priority tasks in your database.`,
        error: "No task",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        data: null,
        message: `Failed to fetch tasks with priority "${priority}"`,
        error: err.message,
      };
    }
  },

  async fetchByPostedWithinWithinOrAfterDays(userId, day, isBefore) {
    let days = day;
    try {
      if (!isBefore) {
        days = days - 1;
      }
      const operator = isBefore ? ">=" : "<=";
      const sql = `SELECT * FROM tasks WHERE user_id = ? AND created_at ${operator} NOW() - INTERVAL ? DAY`;
      const [rows] = await db.query(sql, [userId, days]);

      if (rows.length > 0) {
        return {
          success: true,
          status: 200,
          data: rows,
          message: `Tasks ${
            isBefore ? "posted within" : "posted after"
          } ${days} days fetched successfully, scroll at the bottom.`,
          error: null,
        };
      }

      return {
        success: false,
        status: 404,
        data: rows,
        message: `No tasks ${
          isBefore ? "posted within" : "posted after"
        } ${days} days.`,
        error: "No task",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        data: null,
        message: `Failed to fetch tasks ${
          isBefore ? "posted within" : "posted after"
        } ${days} days`,
        error: err.message,
      };
    }
  },

  async fetchByUpdatedWithinOrAfterDays(userId, day, isBefore) {
    let days = day;
    try {
      if (!isBefore) {
        days = days - 1;
      }
      const operator = isBefore ? ">=" : "<=";
      const sql = `SELECT * FROM tasks WHERE user_id = ? AND updated_at IS NOT NULL AND updated_at ${operator} NOW() - INTERVAL ? DAY`;
      const [rows] = await db.query(sql, [userId, days]);

      if (rows.length > 0) {
        return {
          success: true,
          status: 200,
          data: rows,
          message: `Tasks ${
            isBefore ? "updated within" : "updated after"
          } ${days} days fetched successfully, scroll at the bottom.`,
          error: null,
        };
      }

      return {
        success: false,
        status: 404,
        data: rows,
        message: `No tasks ${
          isBefore ? "updated within" : "updated after"
        } ${days} days.`,
        error: "No task",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        data: null,
        message: `Failed to fetch tasks ${
          isBefore ? "updated after" : "updated within"
        } ${days} days`,
        error: err.message,
      };
    }
  },

  async fetchByDeletedWithinOrAfterDays(userId, day, isBefore) {
    let days = day;
    try {
      if (!isBefore) {
        days = days - 1;
      }
      const operator = isBefore ? ">=" : "<=";
      const sql = `SELECT * FROM deleted_tasks WHERE user_id = ? AND created_at ${operator} NOW() - INTERVAL ? DAY`;
      const [rows] = await db.query(sql, [userId, days]);

      if (rows.length > 0) {
        return {
          success: true,
          status: 200,
          data: rows,
          message: `Tasks ${
            isBefore ? "deleted within" : "deleted after"
          } ${days} days fetched successfully, scroll at the bottom.`,
          error: null,
        };
      }

      return {
        success: false,
        status: 404,
        data: rows,
        message: `No tasks ${
          isBefore ? "deleted within" : "deleted after"
        } ${days} days.`,
        error: "No task",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        data: null,
        message: `Failed to fetch tasks ${
          isBefore ? "deleted within" : "deleted after"
        } ${days} days`,
        error: err.message,
      };
    }
  },
};

export { dynamicTaskModel };
