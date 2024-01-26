import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

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
      return res.status(400).json({
        success: false,
        message: "USER ALREADY EXISTS!",
      });
    }

    // const avatarLocalPath = await req.files?.avatar[0]?.path;

    // HASHING AND SALTING PASSWORD
    const encPassword = await bcrypt.hash(password, 10);

    // CREATING NEW USER
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: encPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("ERROR WHILE REGISTERING USER!", error);
    return res.status(400).json({
      success: false,
      message: "ERROR WHILE REGISTERING USER!",
      error,
    });
  }
};

// FUNCTION TO LOGIN USER
const loginUser = async (req: AuthenticatedRequest, res: Response) => {};

// FUNCTION TO LOGOUT USER
const logoutUser = async (req: AuthenticatedRequest, res: Response) => {};

export { registerUser, loginUser, logoutUser };
