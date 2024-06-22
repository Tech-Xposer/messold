import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import validator from "validator";
import { decodeToken } from "../services/token.service.js";
import ApiError from "../handlers/error.handler.js";
import ApiResponse from "../handlers/response.handler.js";
import { userVerificationTemplate } from "../services/template.service.js";
import blackList from "../models/blacklist.model.js";
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const { street, city, state, pincode } = address;
    console.log(req.body);
    if (
      !name ||
      !password ||
      !email ||
      !street ||
      !city ||
      !state ||
      !pincode ||
      !phone
    ) {
      throw new ApiError(400, "All Feilds Required");
    }
    if (!validator.isEmail(email)) {
      throw new ApiError(400, "Invalid Email");
    }
    if (!validator.isMobilePhone(phone)) {
      throw new ApiError(400, "Invalid Mobile Number");
    }

    if (!validator.isStrongPassword(password)) {
      throw new ApiError(
        400,
        "Password must be at least 6 characters, must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already registered");
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address: { state, city, street, pincode },
    });

    const verificationToken = user.createEmailVerificationToken();
    const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify/${verificationToken}`;
    const checkMail = await sendEmail(
      email,
      userVerificationTemplate(name, verificationLink),
    );
    ApiResponse.success(res, 200, "User created successfully");
  } catch (error) {
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const generateResetPasswordEmail = async (req, res) => {
  const { email } = req.body || req.params;
  console.log(req.body);
  try {
    if (!email) throw new ApiError(400, "Email is required");
    if (!isEmail(email)) throw new ApiError(400, "Invalid Email");
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    const resetLink = `${process.env.BASE_URL}/api/v1/user/reset-password/${resetToken}`;
    await sendEmail(email, userPasswordResetTemplate(user.name, resetLink));
    ApiResponse.success(res, 200, "Password reset link sent to your email");
  } catch (error) {
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const postResetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  try {
    if (!isJWT(token)) throw new ApiError(400, "Invalid Token");
    if (!password || !confirmPassword)
      throw new ApiError(400, "All fields required");
    if (password !== confirmPassword)
      throw new ApiError(400, "Passwords do not match");
    if (!isStrongPassword(password))
      throw new ApiError(400, "Password Not Strong");
    const { _id } = decodeToken(token);
    const user = await User.findById(_id);
    if (!user) throw new ApiError(404, "User not found");
    user.password = password;
    await user.save();
    ApiResponse.success(res, 200, "Password reset successfully");
  } catch (error) {
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const login = async (req, res) => {
  try {
    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, // The cookie only accessible by the web server
      signed: true,
      secure: true,
    };
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "All Feilds Required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User Not Found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid Password");
    }

    //check is user verified
    if (user.is_verified === 0) {
      throw new ApiError(400, "Please Verify Your Email");
    }
    const token = user.generateLoginToken();
    res.cookie("token", token, options);
    ApiResponse.success(res, 200, "Login Successful", {
      token,
    });
  } catch (err) {
    return ApiResponse.error(res, err.message, err.statusCode || 500);
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    if (!validator.isJWT(token)) throw new ApiError(400, "Invalid Token");
    const { id } = decodeToken(token);

    const user = await User.findById(id);
    if (!user) throw new ApiError(404, "User Not Found");
    if (user.isVerified) throw new ApiError(400, "Email Already Verified");
    user.isVerified = true;
    const verifiedUser = await user.save();
    console.log(verifiedUser);
    ApiResponse.success(res, 200, "Email Verified Successfully");
  } catch (error) {
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -isVerified  -updatedAt -__v -createdAt",
    );
    if (!user) throw new ApiError(404, "User Not Found");
    return ApiResponse.success(res, 200, "User Found", user);
  } catch (error) {
    return ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const logout = async (req, res) => {
  try {
    const token =
      req.signedCookies.token || req.headers.authorization.split(" ")[1];
    await blackList.create({ token });
    res.clearCookie("token");
    ApiResponse.success(res, 204, "Logged Out Successfully");
  } catch (error) {
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};
