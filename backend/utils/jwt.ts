import jwt, { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";

const secretKey = process.env.JWTSECRETKEY as Secret;

// FUNCTION TO GENERATE ACCESS TOKEN
async function generateAccessToken(user: User) {
  try {
    const payload = {
      id: user.userUid,
      email: user.email,
    };

    const accessToken = await jwt.sign(payload, secretKey, {
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    console.error("ERROR GENERATING ACCESS TOKEN: ", error);
    return "";
  }
}

// FUNCTION TO GENERATE REFRESH TOKEN
async function generateRefreshToken(user: User) {
  try {
    const payload = {
      id: user.userUid,
      email: user.email,
    };

    const refreshToken = await jwt.sign(payload, secretKey, {
      expiresIn: "7d",
    });

    return refreshToken;
  } catch (error) {
    console.error("ERROR GENERATING REFRESH TOKEN: ", error);
    return "";
  }
}

export { generateAccessToken, generateRefreshToken };
