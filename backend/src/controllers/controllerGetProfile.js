import { getUserProfile } from "../models/modelProfile.js";

async function handleGettingUserProfile(req, res) {
  try {
    const { userId } = req.user;
    const data = await getUserProfile(userId);
    const statusCode = data.status || (data.success ? 200 : 400);
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: "Unable to get your profile, please try torefresh it once.",
      data: null,
    });
  }
}

export { handleGettingUserProfile };
