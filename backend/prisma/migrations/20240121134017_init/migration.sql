-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inbox" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inboxUid" TEXT NOT NULL,
    "lastMessage" TEXT,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboxParticipant" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "inboxUid" TEXT NOT NULL,

    CONSTRAINT "InboxParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupUid" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "groupAdminUid" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupParticipant" (
    "id" SERIAL NOT NULL,
    "groupUid" TEXT NOT NULL,
    "participantUid" TEXT NOT NULL,

    CONSTRAINT "GroupParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageUid" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inboxUid" TEXT NOT NULL,
    "senderUid" TEXT NOT NULL,
    "receiverUid" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userUid_key" ON "User"("userUid");

-- CreateIndex
CREATE UNIQUE INDEX "Inbox_inboxUid_key" ON "Inbox"("inboxUid");

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupUid_key" ON "Group"("groupUid");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_messageUid_key" ON "Messages"("messageUid");

-- AddForeignKey
ALTER TABLE "InboxParticipant" ADD CONSTRAINT "InboxParticipant_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("userUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InboxParticipant" ADD CONSTRAINT "InboxParticipant_inboxUid_fkey" FOREIGN KEY ("inboxUid") REFERENCES "Inbox"("inboxUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_groupAdminUid_fkey" FOREIGN KEY ("groupAdminUid") REFERENCES "User"("userUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupParticipant" ADD CONSTRAINT "GroupParticipant_groupUid_fkey" FOREIGN KEY ("groupUid") REFERENCES "Group"("groupUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupParticipant" ADD CONSTRAINT "GroupParticipant_participantUid_fkey" FOREIGN KEY ("participantUid") REFERENCES "User"("userUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_inboxUid_fkey" FOREIGN KEY ("inboxUid") REFERENCES "Inbox"("inboxUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderUid_fkey" FOREIGN KEY ("senderUid") REFERENCES "User"("userUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverUid_fkey" FOREIGN KEY ("receiverUid") REFERENCES "User"("userUid") ON DELETE RESTRICT ON UPDATE CASCADE;
