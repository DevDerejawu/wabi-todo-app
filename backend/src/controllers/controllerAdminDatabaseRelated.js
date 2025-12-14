import { adminModel } from "../models/modelAdminDatabaseRelated.js";

const adminController = {
  totalUsers: async (req, res) => {
    try {
      const data = await adminModel.getTotalUsers();
      const statusCode = data.status || (data.success ? 200 : 400);
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        error: err.message,
        data: null,
        message: "Internal server error",
      });
    }
  },

  totalTasks: async (req, res) => {
    try {
      const data = await adminModel.getTotalTasks();
      const statusCode = data.status || (data.success ? 200 : 400);
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        error: err.message,
        data: null,
        message: "Internal server error",
      });
    }
  },

  usersList: async (req, res) => {
    const data = await adminModel.getUsersList();
    try {
      const statusCode = data.status || (data.success ? 200 : 400);
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        error: err.message,
        data: null,
        message: "Internal server error",
      });
    }
  },

  tasksList: async (req, res) => {
    const data = await adminModel.getTasksList();
    try {
      const statusCode = data.status || (data.success ? 200 : 400);
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        error: err.message,
        data: null,
        message: "Internal server error",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { email } = req.params;
    const data = await adminModel.deleteUserByEmail(email);
    try {
      const statusCode = data.status || (data.success ? 200 : 400);
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        error: err.message,
        data: null,
        message: "Internal server error",
      });
    }
  },
};

export { adminController };
