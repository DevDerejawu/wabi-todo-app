import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcrypt";
import db from '../../config/db.js';
import { findUserByEmail } from "../middlewares/findByEmailMiddleware.js";
//import { sendVerificationEmail } from "../../utiles/sendVerificationEmail.js";
import dayjs from 'dayjs';


const now = dayjs().format('YYYY-MM-DD HH:mm:ss');


async function registerUsers(body) {
  try {
    const { name, email, password } = body;

    
    const isAlreadyExist = await findUserByEmail(email);
    if (isAlreadyExist) {
      return {
        success: false,
        status: 409, 
        error: "email_exists",
        message: "Email already exists.",
        data: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const registerSql = `
      INSERT INTO users
      (name, email, password, verification_token, verification_expires, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(registerSql, [
      name,
      email,
      hashedPassword,
      verificationCode,
      verificationExpires,
      now
    ]);

    if (!result.insertId) {
      return {
        success: false,
        status: 500,
        error: "register_failed",
        message: "Registration failed, please try again.",
        data: null
      };
    }

    // Send verification email
    //since the email is not sent just comment it

    //await sendVerificationEmail(verificationCode, email);

    return {
      success: true,
      status: 201,
      error: null,
      message: `Successfully registered. Thank you, ${name}.`,
      data: { userId: result.insertId }
    };

  } catch (err) {
    
    return {
      success: false,
      status: 500,
      error: "server_error",
      message: "Unable to register, please try again.",
      data: null
    };
  }
}


async function makeUsersLogin(body) {
  try {
    const { email, password } = body;

    const user = await findUserByEmail(email);
    if (!user) {
      return {
        success: false,
        status: 404,
        message: `User not found with email: ${email}`,
        data: null
      };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
   
    if (!isPasswordMatch) {
      return {
        success: false,
        status: 401,
        message: "Invalid password.",
        data: null
      };
    }

    return {
      success: true,
      status: 200,
      message: "Logged in successfully.",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };

  } catch (err) {
   
    return {
      success: false,
      status: 500,
      message: "Unable to log in, please try again.",
      data: null
    };
  }
}


export { registerUsers, makeUsersLogin };
