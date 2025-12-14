import db from "../../config/db.js"; 

async function getStatisticsData(userId) {
  try {
    const sql = `SELECT priority, status FROM tasks WHERE user_id = ?`;
    const [rows] = await db.query(sql, [userId]);

    const totalTasks = rows.length;
    let totalCompletedTasks = 0;
    let totalPendingTasks = 0;
    let totalInProgressTasks = 0;
    let totalHighPriorityTasks = 0;
    let totalMediumPriorityTasks = 0;
    let totalLowPriorityTasks = 0;

    rows?.forEach((task) => {
      if (task?.status === "completed") totalCompletedTasks += 1;
      else if (task?.status === "pending") totalPendingTasks += 1;
      else if (task?.status === "in_progress") totalInProgressTasks += 1;

      if (task?.priority === "high") totalHighPriorityTasks += 1;
      else if (task?.priority === "medium") totalMediumPriorityTasks += 1;
      else if (task?.priority === "low") totalLowPriorityTasks += 1;
    });

    return {
      success: true,
      status: 200,
      error: null,
      message: "Statistics fetched successfully",
      data: {
        total: totalTasks,
        completed: totalCompletedTasks,
        pending: totalPendingTasks,
        inProgress: totalInProgressTasks,
        high: totalHighPriorityTasks,
        medium: totalMediumPriorityTasks,
        low: totalLowPriorityTasks,
      },
    };
  } catch (err) {
    throw new Error("Database error while fetching statistics");
  }
}

export { getStatisticsData };
