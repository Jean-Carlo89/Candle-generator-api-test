import { Sign } from "crypto";
import { MongoClient } from "mongodb";
import { app } from "../app";

//let connectionexport;

const connectToMongoDb = async () => {
  console.log(process.env.MDB_URI);

  try {
    const client = await new MongoClient(process.env.MDB_URI);
    app.locals.fb = client;
    const connection = await client.connect();
    console.log(`connected to db ${connection.db().databaseName}`);
    app.locals.db = connection;
    process.on("SIGINT", async () => {
      try {
        connection.close(() => {
          console.log("connection to db closed");
        });
      } catch (e) {
        console.log(e);
        return;
      }
    });
    return connection;
  } catch (e) {
    console.log("Erro during db connection");
    return null;
  }
};

export { connectToMongoDb };
