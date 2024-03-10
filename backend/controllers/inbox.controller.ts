import { Response } from "express";
import { AuthenticatedRequest } from "../types/request";
import { prisma } from "../db/prisma";

async function getInboxes(req: AuthenticatedRequest, res: Response) {
  try {
    const inboxes = await prisma.inbox.findMany({
      where: {
        inboxParticipants: {
          some: {
            userUid: req.user!.userUid,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, userId: req.user!.userUid, inboxes });
  } catch (error) {
    console.error("ERROR WHILE FETCHING MESSAGES", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

async function createInbox(req: AuthenticatedRequest, res: Response) {
  try {
    const inbox = await prisma.inbox.create({ data: {} });

    return res.status(201).json({
      success: true,
      id: inbox.id,
    });
  } catch (error) {
    console.error("ERROR WHILE CREATING INBOX", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

async function getInboxMessages(req: AuthenticatedRequest, res: Response) {
  try {
    console.log(req.params.id);

    const messages = await prisma.messages.findMany({
      where: { inboxUid: req.params.id },
    });

    console.log(messages);

    return res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("ERROR WHILE FETCHING MESSAGES", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

async function sendMessageToInbox(req: AuthenticatedRequest, res: Response) {
  try {
    const message = await prisma.messages.create({
      data: {
        inboxUid: req.params.id,
        senderUid: req.body.senderId,
        receiverUid: req.body.receiverId,
        message: req.body.message,
      },
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("ERROR WHILE SENDING MESSAGE", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!!",
      error,
    });
  }
}

export { getInboxes, createInbox, getInboxMessages, sendMessageToInbox };
