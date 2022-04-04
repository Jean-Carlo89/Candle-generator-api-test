import mongodb, { CommandFailedEvent, MongoClient } from "mongodb";
import { Candle } from "../models/CandleModel";

export default class CandleController {
  private _databaseConnection: MongoClient;

  constructor(conn: MongoClient) {
    this._databaseConnection = conn;
  }

  public async saveNew(candle: Candle) {
    // console.log(this._databaseConnection);
    const db = this._databaseConnection.db("Candle-Generator");
    const collection = db.collection("candles");
    collection.insertOne(candle);
  }

  public async getLastCandles(quantity: number): Promise<Candle[]> {
    const n = quantity > 0 ? quantity : 10;
    const db = this._databaseConnection.db("Candle-Generator");
    const collection = db.collection("candles");
    const results = await collection
      .find()
      .sort({ _id: -1 })
      .limit(n)
      .toArray();

    const lastCandles: Candle[] = results.map((candle) => {
      return {
        currency: candle.currency,
        finalDateTime: candle.finalDateTime,
        open: candle.open,
        close: candle.close,
        high: candle.high,
        low: candle.low,
        color: candle.color,
      };
    });

    return lastCandles;
  }
}
