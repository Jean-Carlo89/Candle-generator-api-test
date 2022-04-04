import express from "express";
import morgan from "morgan";
import cors from "cors";
import candleRouter from "./routes/candle";
import config from "./default";
import http from "http";

const app = express();
const Port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/candles", candleRouter);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

var server = http.createServer(app);

export { app, server };
