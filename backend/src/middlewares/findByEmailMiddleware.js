import db from '../../config/db.js';

async function findUserByEmail(email){
  const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  if(rows.length > 0){
    return rows[0];
  }
  return false;
}

export {findUserByEmail};