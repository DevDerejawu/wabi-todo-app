import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/db.js";

async function updateUserProfile({
  name,
  password,
  targetedUrlToSaveInDb,
  userId,
}) {
  try {
    const sql = `
      UPDATE users 
      SET name = COALESCE(?, name),
          password = COALESCE(?, password),
          profile_picture = COALESCE(?, profile_picture)
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [
      name,
      password,
      targetedUrlToSaveInDb,
      userId,
    ]);

    if (result.affectedRows > 0) {
      const getSql = `SELECT name, profile_picture FROM users WHERE id = ?`;
      const [rows] = await db.query(getSql, [userId]);

      return {
        success: true,
        status: 200,
        message: "Profile updated successfully",
        data: {
          name: rows[0].name,
          profilePicture: rows[0].profile_picture,
        },
        error: null,
      };
    }

    return {
      success: false,
      status: 400,
      message: "Profile update failed",
      data: null,
      error: "No rows updated",
    };
  } catch (err) {
   
    return {
      success: false,
      status: 500,
      message: "Database error",
      data: null,
      error: err.message,
    };
  }
}

export { updateUserProfile };
