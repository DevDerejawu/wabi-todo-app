export function validatePassword(notOptional) {
  return function (req, res, next) {
    const password = req.body.password?.trim() || "";

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

    if (notOptional) {
      if (!password) {
        return res.status(400).json({
          success: false,
          error: "password",
          message: "Password is required.",
        });
      }

      if (!pattern.test(password)) {
        return res.status(400).json({
          success: false,
          error: "password",
          message:
            "Include uppercase, lowercase, number, and at least 5 characters.",
        });
      }

      return next();
    }

    if (!password) {
      return next();
    }

    if (!pattern.test(password)) {
      return res.status(400).json({
        success: false,
        error: "password",
        message:
          "Include uppercase, lowercase, number, and at least 5 characters.",
      });
    }

    next();
  };
}
