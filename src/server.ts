import "./setup";
//import { Server } from "http"
import app from "./app";
import { connectToMongoDb } from "./config/database";
const port = 3000;

const server = app.listen(port, async () => {
  await connectToMongoDb();
  console.log(`Server listening on port ${port}`);

  process.on("SIGINT", () => {
    server.close();
    console.log("Server down");
  });
});
