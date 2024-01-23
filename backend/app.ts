import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
import userRouter from "./routes/user.routes";

app.use("/api/v1/users", userRouter);

export { app };
