export function handleLogout(req, res) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: false,
        status: 401,
        error: "unauthenticated",
        message: "No active session found to logout.",
        data: null,
      });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      status: 200,
      error: null,
      message: "You have logged out successfully.",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: "Unable to logout, please try again.",
      data: null,
    });
  }
}
