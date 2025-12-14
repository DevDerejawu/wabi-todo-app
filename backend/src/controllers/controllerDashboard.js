function dashboardInHome(req, res) {
  try {
    return res.status(200).json({
      success: true,
      status: 200,
      error: null,
      message: "You are redirected to your dashboard.",
      data: {
        name: req.user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: "Something went wrong while loading the dashboard.",
      data: null,
    });
  }
}

export { dashboardInHome };
