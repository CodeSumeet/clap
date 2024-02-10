import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";

interface AuthenticatedRequest extends Request {
  user?: User;
  token: string;
}

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authenticatedReq = req as AuthenticatedRequest; // Type assertion

    const token = authenticatedReq.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWTSECRETKEY as Secret);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    next();
  } catch (error: any) {
    console.log("ERROR WHILE AUTHENTICATING USER: ", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    } else {
      return res.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR!!",
        error,
      });
    }
  }
}

export { isAuthenticated };
