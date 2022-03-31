import { Sign } from "crypto";
import { MongoClient } from "mongodb";
import app from "../app";

//let connectionexport;

const connectToMongoDb = async () => {
  console.log(process.env.MDB_URI);
  const client = new MongoClient(process.env.MDB_URI);

  try {
    const connection = await client.connect();
    console.log(`connected to db ${connection.db().databaseName}`);
    app.locals.dbConnection = connection;
    process.on("SIGINT", async () => {
      try {
        await connection.close();
        console.log("connection to db closed");
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export { connectToMongoDb };
