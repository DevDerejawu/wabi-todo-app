import mysql from "mysql2/promise";


const db = await mysql.createConnection({
  host: process.env?.DB_HOST || "localhost",
  user: process.env?.DB_USER || "todoapp-wabi-dev-derejawu",
  password: process.env?.DB_PASSWORD || "6hgFDt765$gfh@$hg",
  database: process.env?.DB_DATABASE || "todoappdb",
});

console.log("Database connected successfully!");


export default db;
