import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { createMethod } from "../database/method";
import {
  createMethodStep,
  deleteMethodStep,
  updateMethodStep,
} from "../database/method-step";

const stepRouter = express.Router();
const jsonParser = bodyParser.json();

stepRouter.get("/:id", (req, res) => {
  res.send(req.params.id);
});

stepRouter.post("/:id/delete", async (req, res) => {
  try {
    const deletedStep = await deleteMethodStep(req.params.id);
    res.send(deletedStep);
  } catch (error) {
    console.log(error);
  }
});

stepRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const sample = await createMethodStep(req.body);
    res.send(sample);
  } catch (error) {
    console.log(error);
  }
});

stepRouter.post("/:id/update", jsonParser, async (req, res) => {
  try {
    const sample = await updateMethodStep(req.params.id, req.body);
    res.send(sample);
  } catch (error) {
    console.log(error);
  }
});

export { stepRouter };
