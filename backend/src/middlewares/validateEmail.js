export function validateEmail(notOptional) {
  return function (req, res, next) {
    const email = req.body.email?.trim() || "";

    const pattern = /^[^\s@]+@[^\s@]+\.(com|org|net)$/;

    if (notOptional) {
      if (!email) {
        return res.status(400).json({
          success: false,
          field: "email",
          message: "Email is required."
        });
      }

      if (!pattern.test(email)) {
        return res.status(400).json({
          success: false,
          field: "email",
          message:
            "Follow the standard email format and end with .com, .org, or .net."
        });
      }

      return next();
    }


    if (!email) {
      return next(); 
    }

    if (!pattern.test(email)) {
      return res.status(400).json({
        success: false,
        field: "email",
        message:
          "Follow the standard email format and end with .com, .org, or .net."
      });
    }

    next();
  };
}
