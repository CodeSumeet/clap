import { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

function parseFormData(req: Request, res: Response, next: NextFunction) {
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "FAILED TO PARSE FORM DATA!" });
    }
    next();
  });
}

export { parseFormData };
