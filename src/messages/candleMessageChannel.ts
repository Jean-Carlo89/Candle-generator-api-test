import { Channel, connect } from "amqplib";
import CandleController from "../controllers/candleController";
import { Server } from "socket.io";
import * as http from "http";
import { app } from "../app";
import { json } from "express";
import { Candle } from "../models/CandleModel";

export default class CandleMessageChannel {
  private _channel: Channel;
  private _candleController: CandleController;
  private _io: Server;

  // constructor(server: http.Server) {
  //   this._candleController = new CandleController(app.locals.dbConnection);
  //   this._io = new Server(server, {
  //     cors: {
  //       origin: process.env.SOCKET_CLIENT_SERVER,
  //       methods: ["GET", "POST"],
  //     },
  //   });

  //   this._io.on("connection", (client) => {
  //     console.log(`Client connected : ${client.id}`);
  //     console.log("Web socket connection created");

  //     client.on("disconnect", () => {
  //       console.log(`Client disconnected : ${client.id}`);
  //     });
  //   });
  // }

  constructor() {}

  //* Create channel with rabbitmq
  private async _createMessageChanel() {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      this._channel = await connection.createChannel();
      this._channel.assertQueue(process.env.QUEUE_NAME);
    } catch (e) {
      console.log("Connection to RabbitMQ failed");
      console.log(e);
    }
  }

  public async consumeMessages() {
    await this._createMessageChanel();
    if (this._channel) {
      this._channel.consume(process.env.QUEUE_NAME, async (msg) => {
        const candleObj = JSON.parse(msg.content.toString());
        console.log("Message received");
        console.log(candleObj);
        this._channel.ack(msg);

        const candle: Candle = candleObj; //** */ this only works because the producer is sending messages with the exact params required bt Canlde interface

        try {
          await this._candleController.saveNew(candle);
          console.log("Candle saved to database");
        } catch (e) {
          console.log(e);
          console.log("Error saving candle in db");

          return;
        }

        try {
          this._io.emit(process.env.SOCKET_EVENT_NAME, candle);
          console.log("New candle emited by web socket");
        } catch (e) {
          console.log(e);
          console.log("could not send candle by web socket");
          return;
        }
      });

      console.log("Candle consumer online");
    }
  }
}
