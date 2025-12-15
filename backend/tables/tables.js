import dotenv from 'dotenv';
dotenv.config();
import db from '../config/db.js';

//I implemented email functionality because I wanted to send a verification email when users sign up. However, sending emails securely requires handling several security-related configurations, such as proper credential management, app passwords, and environment variables. Since this project is currently for learning purposes, I decided to temporarily leave the email feature aside and focus on the core functionality. I plan to revisit and implement it properly with full security measures later.
const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  verified TINYINT(1) DEFAULT 0,
  verification_token VARCHAR(255),
  is_first_login INT DEFAULT 1,
  profile_picture VARCHAR(255) NULL,
  verification_expires TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL
) ENGINE=InnoDB;
`;

const createTaskTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(21) NOT NULL,
  time_quantity INT NOT NULL,
  time_unit VARCHAR(23) NOT NULL,
  deadline VARCHAR(23) NOT NULL,
  status VARCHAR(15) DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

const deletedTaskTable = `
CREATE TABLE IF NOT EXISTS deleted_tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(21) NOT NULL,
  time_quantity INT NOT NULL,
  time_unit VARCHAR(23) NOT NULL,
  deadline VARCHAR(23) NOT NULL,
  status VARCHAR(15) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

async function creatingTables() {
  try {
    await db.query(createUserTable);
    await db.query(createTaskTable);
    await db.query(deletedTaskTable);
    console.log("Users, deleted_tasks and tasks tables created successfully.");
  } catch (err) {
    console.log("Error creating tables:", err.message);
  }
}

// it is not needed once tables are created so commenting the called function is better
//await creatingTables()


