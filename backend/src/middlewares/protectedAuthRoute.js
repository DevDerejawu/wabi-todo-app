import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../utiles/tokens.js";

function authenticate(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    //if session is expired returned with the status of 401
    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: false,
        status: 401,
        error: "unauthenticated",
        message: "No active session. Please log in!"
      });
    }

    // if accesstoken is available attach user info and continu the handler
    if (accessToken) {
        const decoded = jwt.verify(accessToken, process.env?.JWT_ACCESS_SECRET ||"67jfhfggc");
        req.user = decoded;
        return next();
    }

    // accessToken is failed try refreshtoken to generate a new access and attach user info.
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env?.JWT_REFRESH_SECRET || "hfg67utmn");
        const { userId, email, name, role } = decodedRefresh;

        // Generate new access token
        const newAccessToken = generateAccessToken({ userId, email, name, role });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 15 * 60 * 1000
        });

        req.user = decodedRefresh;
        return next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          status: 401,
          error: "unauthenticated",
          message: "Session expired. Please log in again!"
        });
      }
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "server_error",
      message: "Something went wrong on the server"
    });
  }
}

export default authenticate;
