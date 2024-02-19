import { User } from "@prisma/client";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">;
}

export { AuthenticatedRequest };
