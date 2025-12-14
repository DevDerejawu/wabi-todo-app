import { getStatisticsData } from "../models/modelDashboardStatistics.js";

export async function handleGettingStatisticsData(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        status: 401,
        error: "unauthenticated",
        message: "No user ID found. Please log in!",
      });
    }

    const data = await getStatisticsData(userId);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: err.message || "Something went wrong while fetching statistics",
      data: null,
    });
  }
}
