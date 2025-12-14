//I implemented email functionality because I wanted to send a verification email when users sign up. However, sending emails securely requires handling several security-related configurations, such as proper credential management, app passwords, and environment variables. Since this project is currently for learning purposes, I decided to temporarily leave the email feature aside and focus on the core functionality. I plan to revisit and implement it properly with full security measures later.
import { verifyEmail } from "../models/modelVerifyEmail.js";

async function handleEmailVerifying(req, res) {
  try {
    const { userId, otp } = req.body;
    const data = await verifyEmail({ userId, otp });

    const statusCode = data.status || (data.success ? 200 : 400);
    return res.status(statusCode).json(data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: err.message || "Something went wrong while verifying email",
      data: null,
    });
  }
}

export { handleEmailVerifying };
