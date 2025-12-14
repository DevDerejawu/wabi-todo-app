//I implemented email functionality because I wanted to send a verification email when users sign up. However, sending emails securely requires handling several security-related configurations, such as proper credential management, app passwords, and environment variables. Since this project is currently for learning purposes, I decided to temporarily leave the email feature aside and focus on the core functionality. I plan to revisit and implement it properly with full security measures later.
import db from "../../config/db.js";

async function verifyEmail(body) {
  try {
    const { otp, userId } = body;

    const verifySql = `
      SELECT * FROM users 
      WHERE id = ? 
        AND verification_token = ? 
        AND verification_expires > NOW()
    `;
    const [rows] = await db.query(verifySql, [userId, otp]);

    if (rows.length !== 1) {
      return {
        success: false,
        status: 400,
        error: "invalid_or_expired_otp",
        message:
          "Unable to verify. Either your OTP is invalid or verification time has expired.",
        data: null,
      };
    }

    await db.query(
      "UPDATE users SET verified = 1, verification_token = NULL, verification_expires = NULL WHERE id = ?",
      [rows[0].id]
    );

    return {
      success: true,
      status: 200,
      error: null,
      message:
        "You have successfully verified your email! Now you can log in to access your dashboard.",
      data: { userId: rows[0].id, email: rows[0].email, name: rows[0].name },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: "server_error",
      message: "Unable to verify, please try again.",
      data: null,
    };
  }
}

export { verifyEmail };
