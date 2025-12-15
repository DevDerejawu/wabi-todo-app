import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/db.js";


const adminModel = {
  async getTotalUsers() {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return {
        success: true,
        status: 200,
        message: "Total users fetched successfully",
        data: rows,
        error: null,
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "Failed to fetch total users",
        data: null,
        error: err.message,
      };
    }
  },

  async getTotalTasks() {
    try {
      const [rows] = await db.query("SELECT * FROM tasks");
      return {
        success: true,
        status: 200,
        message: "Total tasks fetched successfully",
        data: rows,
        error: null,
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "Failed to fetch total tasks",
        data: null,
        error: err.message,
      };
    }
  },

  async getUsersList() {
    try {
      const [rows] = await db.query("SELECT name, email FROM users");
      return {
        success: true,
        status: 200,
        message: "Users list fetched successfully",
        data: rows,
        error: null,
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "Failed to fetch users list",
        data: null,
        error: err.message,
      };
    }
  },

  async getTasksList() {
    try {
      const [rows] = await db.query("SELECT * FROM tasks");
      return {
        success: true,
        status: 200,
        message: "Tasks list fetched successfully",
        data: rows,
        error: null,
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "Failed to fetch tasks list",
        data: null,
        error: err.message,
      };
    }
  },

  async deleteUserByEmail(email) {
    try {
      const [result] = await db.query("DELETE FROM users WHERE email = ?", [
        email,
      ]);
      if (result.affectedRows > 0) {
        return {
          success: true,
          status: 200,
          message: `User with email ${email} deleted successfully`,
          data: null,
          error: null,
        };
      }
      return {
        success: false,
        status: 404,
        message: `User with email ${email} not found`,
        data: null,
        error: "No rows deleted",
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "Failed to delete user",
        data: null,
        error: err.message,
      };
    }
  },
};

export { adminModel };
