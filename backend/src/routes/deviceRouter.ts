import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { createDevice, deleteDevice, updateDevice } from "../database/device";

const deviceRouter = express.Router();
const jsonParser = bodyParser.json();

deviceRouter.get("/:id", loggedIn, (req, res) => {
  res.send(req.params.id);
});

deviceRouter.delete("/:id/delete", async (req, res) => {
  try {
    const deletedDevice = await deleteDevice(req.params.id);
    res.send(deletedDevice);
  } catch (error) {
    console.log(error);
  }
});

deviceRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const device = await createDevice(req.body);
    res.send(device);
  } catch (error) {
    console.log(error);
  }
});

deviceRouter.post("/:id/update", jsonParser, async (req, res) => {
  try {
    const device = await updateDevice(req.params.id, req.body);
    res.send(device);
  } catch (error) {
    console.log(error);
  }
});

export { deviceRouter };
