import { app } from "../app";
import { Router } from "express";
import CandleController from "../controllers/candleController";

const candleRouter = Router();

candleRouter.get("/:quantity", async (req, res) => {
  // console.log(app.locals.db);
  const candleCtrl = new CandleController(app.locals.db);
  const quantity = parseInt(req.params.quantity);
  const lastCandles = await candleCtrl.getLastCandles(quantity);
  return res.json(lastCandles);
});

export default candleRouter;
