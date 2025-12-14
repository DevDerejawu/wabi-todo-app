import jwt from "jsonwebtoken";
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.env?.JWT_ACCESS_SECRET || "67jfhfggc", {
    expiresIn: process.env?.JWT_ACCESS_EXIPRES_IN || "15m"
  });
} 

 function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env?.JWT_REFRESH_SECRET || "hfg67utmn", {
    expiresIn: process.env?.JWT_REFRESH_EXPIRES_IN || "4w"
  });
}

export {generateRefreshToken, generateAccessToken}