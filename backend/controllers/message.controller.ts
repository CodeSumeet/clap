import { Request, Response } from "express";

async function sendMessage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    return res.status(200).json({ id: id });
  } catch (error) {
    console.error("ERROR WHILE FETCHING MESSAGES", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

export { sendMessage };
