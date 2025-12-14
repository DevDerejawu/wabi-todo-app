import db from "../../config/db.js";

async function deleteTask(taskId, userId) {
  try {
    const sqlForInsetToDeletedTable = `SELECT * FROM tasks WHERE id = ? AND user_id = ?`;
    const [rows] = await db.query(sqlForInsetToDeletedTable, [taskId, userId]);
    const {
      user_id,
      title,
      content,
      priority,
      time_quantity,
      time_unit,
      deadline,
      status,
    } = rows[0];
    const sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    const [result] = await db.query(sql, [taskId, userId]);

    if (result.affectedRows === 1) {
      const delSql = `INSERT INTO deleted_tasks(user_id, title, content, priority, time_quantity, time_unit, deadline, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

      await db.query(delSql, [
        user_id,
        title,
        content,
        priority,
        time_quantity,
        time_unit,
        deadline,
        status,
      ]);

      return {
        success: true,
        status: 200,
        error: null,
        data: null,
        message: "You have successfully deleted your task.",
      };
    }

    return {
      success: false,
      status: 404,
      error: "not_found",
      data: null,
      message: "Unknow database server issue, try again",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: "server_error",
      data: null,
      message: "Something went wrong on the server.",
    };
  }
}

export { deleteTask };
