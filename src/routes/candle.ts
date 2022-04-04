import { app } from "../app";
import { Router } from "express";
import CandleController from "../controllers/candleController";

const candleRouter = Router();

candleRouter.get("/:quantity", async (req, res) => {
  const candleCtrl = new CandleController(app.locals.dbConnection);
  const quantity = parseInt(req.params.quantity);
  const lastCandles = await candleCtrl.getLastCandles(quantity);
  return res.json(lastCandles);
});

export default candleRouter;
