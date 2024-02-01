import { prisma } from "./prisma";

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("CONNECTED TO THE DATABASE");
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED: ", error);
    process.exit(1);
  }
}

export { connectDB };
