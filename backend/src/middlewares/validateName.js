export function validateName(notOptional) {
  return function (req, res, next) {
    const name = req.body.name?.trim() || "";

    const pattern = /^(?=.{5,})([A-Z][a-z]+) ([A-Z][a-z]+)$/;

    if (notOptional) {
      if (!name) {
        return res.status(400).json({
          success: false,
          field: "name",
          status: 400,
          message:
            "Name is required. Start each name with an uppercase letter, followed by lowercase letters, and include a space."
        });
      }

      if (!pattern.test(name)) {
        return res.status(400).json({
          success: false,
          field: "name",
          status: 400,
          message:
            "Start each name with an uppercase letter, follow with lowercase letters, and separate the two names with a space (minimum 5 characters)."
        });
      }

      return next();
    }

    if (!name) {
      return next(); 
    }

    if (!pattern.test(name)) {
      return res.status(400).json({
        success: false,
        field: "name",
        status: 400,
        message:
          "Start each name with an uppercase letter, follow with lowercase letters, and separate the two names with a space (minimum 5 characters)."
      });
    }

    next();
  };
}
