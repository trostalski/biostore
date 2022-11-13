import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { createMethod, createNewMethod } from "../database/method";

const methodRouter = express.Router();
const jsonParser = bodyParser.json();

methodRouter.get("/:id", loggedIn, (req, res) => {
  res.send(req.params.id);
});

methodRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const method = await createNewMethod(req.body);
    res.send(method);
  } catch (error) {
    console.log(error);
  }
});

export { methodRouter };
