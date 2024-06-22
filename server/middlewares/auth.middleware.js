import User from "../models/user.model.js";
import ApiResponse from "../handlers/response.handler.js";
import { decodeToken } from "../services/token.service.js";
import blackList from "../models/blacklist.model.js";

export const authMiddleware = async (req, res, next) => {
  let token = req.signedCookies.token;
  // Check Authorization header if token is not found in signed cookies
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return ApiResponse.error(res, "Not authenticated", 401);
  }

  try {
    const blacklistedToken = await blackList.findOne({ token });
    if (blacklistedToken) {
      return ApiResponse.error(res, "Token is blacklisted", 401);
    }
    const decoded = decodeToken(token);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    next();
  } catch (error) {
    return ApiResponse.error(res, error.message, 401);
  }
};
