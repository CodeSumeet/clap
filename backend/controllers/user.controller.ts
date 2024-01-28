import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

interface AuthenticatedRequest extends Request {
  user?: User;
}

// FUNCTION TO REGISTER USER
const registerUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // VALIDATING WHETHER ALL FIELDS ARE FILLED
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

    // STORING TOKENS TO THE COOKIES
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

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
};

// FUNCTION TO LOGIN USER
const loginUser = async (req: AuthenticatedRequest, res: Response) => {};

// FUNCTION TO LOGOUT USER
const logoutUser = async (req: AuthenticatedRequest, res: Response) => {};

export { registerUser, loginUser, logoutUser };
