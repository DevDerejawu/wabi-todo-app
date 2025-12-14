import { dynamicTaskModel } from "../models/modelGetDynamicTask.js";

async function handleGettingTasksByStatus(req, res) {
  try {
    const userId = req.user.userId;
    const { status } = req.params;
    const data = await dynamicTaskModel.fetchByStatus(userId, status);
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

async function handleGettingTasksByPriority(req, res) {
  try {
    const userId = req.user.userId;
    const { priority } = req.params;
    const data = await dynamicTaskModel.fetchByPriority(userId, priority);
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}
async function handleGettingTasksByPosted(req, res) {
  try {
    let isBefore = true;
    const userId = req.user.userId;
    const days = Number(req.query.days);
    if (days === 31) {
      isBefore = false;
    } else {
      isBefore = true;
    }
    const data = await dynamicTaskModel.fetchByPostedWithinWithinOrAfterDays(
      userId,
      days,
      isBefore
    );
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

async function handleGettingTasksByUpdated(req, res) {
  try {
    let isBefore = true;
    const userId = req.user.userId;
    const days = Number(req.query.days);
    if (days === 31) {
      isBefore = false;
    } else {
      isBefore = true;
    }
    const data = await dynamicTaskModel.fetchByUpdatedWithinOrAfterDays(
      userId,
      days,
      isBefore
    );
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

async function handleGettingTasksByDeleted(req, res) {
  try {
    let isBefore = null;
    const userId = req.user.userId;
    const days = Number(req.query.days);
    if (days === 31) {
      isBefore = false;
    } else {
      isBefore = true;
    }
    const data = await dynamicTaskModel.fetchByDeletedWithinOrAfterDays(
      userId,
      days,
      isBefore
    );
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Unknown server error.",
    });
  }
}

export {
  handleGettingTasksByStatus,
  handleGettingTasksByPriority,
  handleGettingTasksByPosted,
  handleGettingTasksByUpdated,
  handleGettingTasksByDeleted,
};
