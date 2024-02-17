import { NextFunction, Response } from "express";
import jwt, {
  Secret,
  TokenExpiredError,
  JsonWebTokenError,
  JwtPayload,
} from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/request";

async function isAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWTSECRETKEY as Secret
    ) as JwtPayload;

    req.userId = decodedToken.id;

    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    } else {
      // Log the error but don't send it to the client
      console.error("ERROR WHILE AUTHENTICATING USER: ", error);

      return res.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR!!",
      });
    }
  }
}

export { isAuthenticated };
