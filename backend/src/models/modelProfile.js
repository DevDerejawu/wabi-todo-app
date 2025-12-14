import db from "../../config/db.js";

async function getUserProfile(id) {
  try {
    const sqlSelect = `
      SELECT id, name, email, profile_picture, is_first_login 
      FROM users 
      WHERE id = ?
    `;
    const [rows] = await db.query(sqlSelect, [id]);

    if (rows.length === 0) {
      return {
        success: false,
        status: 404,
        error: "not_found",
        data: [],
        message: "User not found.",
      };
    }

    const user = rows[0];

    if (user.is_first_login === 1) {
      const sqlUpdate = `UPDATE users SET is_first_login = 0 WHERE id = ?`;
      await db.query(sqlUpdate, [id]);
    }

    return {
      success: true,
      status: 200,
      error: null,
      data: user,
      message: "Profile fetched successfully.",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err.message,
      data: null,
      message: "Server error while fetching profile.",
    };
  }
}

export { getUserProfile };
