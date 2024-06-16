import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1',router)

export default app;