import dotenv from "dotenv";
import { server } from "./app";
import { connectDB } from "./db";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DATABASE CONNECTION ERROR", error);
  });
