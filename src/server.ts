import "./setup";
//import { Server } from "http"
import { app, server } from "./app";
import { connectToMongoDb } from "./config/database";
import CandleMessageChannel from "./messages/candleMessageChannel";
import candleRouter from "./routes/candle";
import { Server } from "socket.io";
//import { start } from "repl";
const port = process.env.PORT || 3001;

// const server = app.listen(port, async () => {
//   const mongo = await connectToMongoDb();

//   if (!mongo) {
//     console.log("Shutting down");
//     return;
//   }
//   console.log(`Server listening on port ${port}`);

//   const candleMsgChannel = new CandleMessageChannel(server);

//   candleMsgChannel.consumeMessages();

//   process.on("SIGINT", () => {
//     server.close();
//     console.log("Server down");
//   });
// });

//const candleMsgChannel = new CandleMessageChannel(server);

//** ***************************************/

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://example.com",
//       "https://dev.example.com",
//       "http://localhost:3000",
//     ],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// io.on("connection", (client) => {
//   console.log(`Client connected : ${client.id}`);
//   console.log("Web socket connection created");

//   client.on("disconnect", () => {
//     console.log(`Client disconnected : ${client.id}`);
//   });
// });

async function start() {
  const mongo = await connectToMongoDb();

  if (mongo !== null) {
    console.log("here 1");
    app.locals.f = mongo;
    server.emit("ready");
  }

  return;
}

server.on("ready", () => {
  server.listen(port, async () => {
    console.log("here2");
    //console.log(app.locals.db);
    const candleMsgChannel = new CandleMessageChannel(server);

    candleMsgChannel.consumeMessages();

    console.log(`Server listening on port ${port}`);

    process.on("SIGINT", () => {
      server.close();
      console.log("Server down");
    });
  });
});

start();

// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   // options
// });

// io.on("connection", (socket) => {
//   // ...
// });

// httpServer.listen(3000);
