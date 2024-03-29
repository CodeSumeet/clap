import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt, { Secret } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: User;
}

// FUNCTION TO REGISTER USER
async function registerUser(req: AuthenticatedRequest, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // VALIDATE INPUT DATA
    if (
      [firstName, lastName, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      console.error("ALL FIELDS ARE REQUIRED!");
      return res.status(400).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED!",
      });
    }

    // VALIDATING WEATHER USER ALREADY EXISTS OR NOT
    const existingUser = await prisma.user.findUnique({
      where: { email: email || undefined },
    });

    if (existingUser) {
      console.error("USER ALREADY EXISTS!");

      console.log(existingUser);
      return res.status(409).json({
        success: false,
        message: "USER ALREADY EXISTS!",
      });
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({
        success: false,
        message: "AVATAR FILE IS REQUIRED!",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // HASHING AND SALTING PASSWORD
    const encPassword = await bcrypt.hash(password, 10);

    // CREATING NEW USER
    const user = await prisma.user.create({
      data: {
        avatar: avatar?.url,
        firstName,
        lastName,
        email,
        password: encPassword,
      },
    });

    // GENERATING ACCESS AND REFRFESH TOKENS
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return res.status(200).json({
      success: true,
      message: "USER REGISTERED SUCCESSFULLY!",
      user: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("ERROR WHILE REGISTERING USER!", error);
    return res.status(400).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

// FUNCTION TO LOGIN USER
async function loginUser(req: AuthenticatedRequest, res: Response) {
  try {
    const { email, password } = req.body;

    // VALIDATE INPUT DATA
    if ([email, password].some((field) => field?.trim() === "")) {
      console.error("ALL FIELDS ARE REQUIRED!");
      return res.status(400).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED!",
      });
    }

    console.log("Email, Password", email, " ", password);

    // VALIDATING WHETHER USER EXISTS OR NOT
    const user = await prisma.user.findUnique({
      where: { email: email || undefined },
    });

    if (!user) {
      console.error("USER NOT FOUND!");
      return res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }

    //  VERIFYING THE PASSWORD
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error("INVALID PASSWORD!");
      return res.status(401).json({
        success: false,
        message: "INVALID PASSWORD!",
      });
    }

    // GENERATING ACCESS AND REFRESH TOKENS
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    if (!accessToken || !refreshToken) {
      return res.send(300).json({
        success: false,
        message: "SOMETHING WENT WRONG WITH TOKEN GENERATION!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "USER LOGGED IN SUCCESSFULLY!",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("ERROR WHILE LOGGING IN USER!", error);
    return res.status(400).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

// FUNCTION TO LOGOUT USER
async function logoutUser(req: AuthenticatedRequest, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "USER LOGGED OUT SUCCESSFULLY!",
  });
}

// FUNCTION TO REFRESH THE ACCESS TOKEN
async function refreshToken(req: AuthenticatedRequest, res: Response) {
  try {
    const refreshToken = req.body.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No refresh token provided" });
    }

    // Verify the refresh token's validity
    const decodedRefreshToken: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    );

    // Extract the user ID associated with the refresh token
    const userId = decodedRefreshToken.id;

    // Retrieve user details from the database
    const user = await prisma.user.findUnique({ where: { userUid: userId } });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    // Generate a new access token for the user
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as Secret,
      { expiresIn: "15m" } // Adjust the expiration time as needed
    );

    // Send the new access token back to the client
    return res.status(200).json({ success: true, accessToken: accessToken });
  } catch (error) {
    console.error("ERROR WHILE GENERATING NEW ACCESS TOKEN!", error);
    return res.status(400).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

// FUNCTION TO UPDATE USER PASSWORD
async function resetPassword(req: Request, res: Response) {}

export { registerUser, loginUser, logoutUser, refreshToken, resetPassword };
