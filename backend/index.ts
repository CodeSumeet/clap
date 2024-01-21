import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
