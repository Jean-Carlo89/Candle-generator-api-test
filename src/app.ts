import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const Port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

export default app;
