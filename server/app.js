import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import morgan from "morgan";

import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", router);

export default app;
