import { Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../types/request";
import bcrypt from "bcrypt";

// FUNCTION TO GET USER DETAILS
async function getUser(req: AuthenticatedRequest, res: Response) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Return the user data in the response
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

// FUNCTION TO GET OTHER USERS PROFILE
async function getUserProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const { userUid } = req.params;

    // Validate userUid
    if (!userUid || typeof userUid !== "string") {
      return res.status(400).json({ error: "Bad Request" });
    }

    // Find the user by userUid
    const user = await prisma.user.findUnique({
      where: { userUid },
      select: {
        id: true,
        userUid: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        isOnline: true,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user profile
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error while fetching user profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

// FUNCTION TO UPDATE USER PROFILE
async function updateUser(req: AuthenticatedRequest, res: Response) {
  const userId = req.user!.id;
  const updates = req.body;

  try {
    // Validate updates here if necessary

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Log the update operation
    console.log(`User ${userId} details updated:`, updates);

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);

    // Provide a generic error response to avoid leaking sensitive information
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

// FUNCTION TO CHANGE USER PASSWORD
async function changePassword(req: AuthenticatedRequest, res: Response) {
  const { currentPassword, newPassword } = req.body;
  const userUid = req.user?.userUid;

  const user = await prisma.user.findUnique({
    where: { userUid },
  });

  // Check that the provided password is correct
  const validPassword = await bcrypt.compare(currentPassword, user!?.password);
  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid Password",
    });
  }
  // If the password is correct, hash and save the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  try {
    await prisma.user.update({
      where: { userUid },
      data: { password: hashedNewPassword },
    });
    return res.status(200).json({ success: true, message: "Password Changed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, errors: e });
  }
}

export { getUser, getUserProfile, updateUser, changePassword };
