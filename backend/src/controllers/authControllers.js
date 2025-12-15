import { registerUsers, makeUsersLogin } from "../models/authModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utiles/tokens.js";

async function handleRegisteringUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const data = await registerUsers({ name, email, password });

    const statusCode = data.status || (data.success ? 201 : 400);
    
    return res.status(statusCode).json(data);
  } catch (err) {
    
    return res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: err.message || "Something went wrong while registering",
      data: null,
    });
  }
}

async function handleLoggingIn(req, res) {
  try {
    const { email, password } = req.body;

    const data = await makeUsersLogin({ email, password });

    const statusCode = data.status || data.success ? 200 : 400;
    if (!data.success) {
      return res.status(statusCode).json(data);
    }

    //getting user info to attach in cookies
    const user = data.data;

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Logged in successfully.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal server error.",
      data: null,
    });
  }
}

export { handleRegisteringUser, handleLoggingIn };
