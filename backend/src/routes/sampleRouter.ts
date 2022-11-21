import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { createMethod } from "../database/method";
import { createSample, deleteSample, updateSample } from "../database/sample";

const sampleRouter = express.Router();
const jsonParser = bodyParser.json();

sampleRouter.get("/:id", (req, res) => {
  res.send(req.params.id);
});

sampleRouter.delete("/:id/delete", async (req, res) => {
  try {
    const deletedSample = await deleteSample(req.params.id);
    res.send(deletedSample);
  } catch (error) {
    console.log(error);
  }
});

sampleRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const sample = await createSample(req.body);
    res.send(sample);
  } catch (error) {
    console.log(error);
  }
});

sampleRouter.post("/:id/update", jsonParser, async (req, res) => {
  try {
    const sample = await updateSample(req.params.id, req.body);
    res.send(sample);
  } catch (error) {
    console.log(error);
  }
});

export { sampleRouter };
