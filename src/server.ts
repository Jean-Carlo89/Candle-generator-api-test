import "./setup";
//import { Server } from "http"
import app from "./app";
import { connectToMongoDb } from "./config/database";
import CandleMessageChannel from "./messages/candleMessageChannel";
import candleRouter from "./routes/candle";
const port = process.env.PORT || 3001;

const server = app.listen(port, async () => {
  await connectToMongoDb();
  console.log(`Server listening on port ${port}`);

  const candleMsgChannel = new CandleMessageChannel(server);

  candleMsgChannel.consumeMessages();

  process.on("SIGINT", () => {
    server.close();
    console.log("Server down");
  });
});
