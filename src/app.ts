import express from "express";
import morgan from "morgan";
import cors from "cors";
import candleRouter from "./routes/candle";

const app = express();
const Port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/candles", candleRouter);

export default app;
