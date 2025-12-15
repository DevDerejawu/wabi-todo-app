import mysql from "mysql2/promise";

const DB_HOST = process.env?.DB_HOST;
const DB_USER = process.env?.DB_USER;
const DB_PASSWORD = process.env?.DB_PASSWORD ;
const DB_DATABASE = process.env?.DB_DATABASE;
const DB_PORT = process.env?.DB_PORT;

const db = await mysql.createConnection({
  host: DB_HOST, //"localhost",
  user: DB_USER, //"root",
  password: DB_PASSWORD, //"root", 
  database: DB_DATABASE, //"localtodoapp",
  port: DB_PORT,
});

console.log("Connected to remote FreeSQLDatabase successfully!");


export default db;
