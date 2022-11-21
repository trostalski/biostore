import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { getDevicesForMethod } from "../database/device";
import {
  connectDevicesToMethods,
  connectDeviceToMethod,
  connectReagentsToMethods,
  connectReagentToMethod,
  createNewMethod,
  deleteDeviceOnMethod,
  deleteReagentOnMethod,
  deleteUnnamedMethods,
  getAllMethods,
  getMethod,
  updateMethod,
} from "../database/method";
import { getStepsForMethod } from "../database/method-step";
import { getReagentsForMethod } from "../database/reagent";
import { getSamplesForMethod } from "../database/sample";

const methodRouter = express.Router();
const jsonParser = bodyParser.json();

methodRouter.get("/all", async (req, res) => {
  try {
    const methods = await getAllMethods();
    res.send(methods);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id", async (req, res) => {
  try {
    const method = await getMethod(req.params.id);
    res.send(method);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/delete/unnamed", async (req, res) => {
  try {
    const methods = await deleteUnnamedMethods();
    res.send(methods);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/:id/reagent/connect", jsonParser, async (req, res) => {
  try {
    const reagentOnMethod = await connectReagentToMethod(
      req.params.id,
      req.body
    );
    res.send(reagentOnMethod);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/:id/device/connect", jsonParser, async (req, res) => {
  try {
    const deviceOnMethod = await connectDeviceToMethod(req.params.id, req.body);
    res.send(deviceOnMethod);
  } catch (error) {
    console.log(error);
  }
});

// connect multiple method with multiple reagents
methodRouter.post("/reagents/connect", jsonParser, async (req, res) => {
  try {
    const reagentOnMethod = await connectReagentsToMethods(req.body);
    res.send(reagentOnMethod);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/devices/connect", jsonParser, async (req, res) => {
  try {
    const deviceOnMethod = await connectDevicesToMethods(req.body);
    res.send(deviceOnMethod);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id/reagents", async (req, res) => {
  try {
    const samples = await getReagentsForMethod(req.params.id);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id/devices", async (req, res) => {
  try {
    const samples = await getDevicesForMethod(req.params.id);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id/steps", async (req, res) => {
  try {
    const samples = await getStepsForMethod(req.params.id);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/:id/reagent/delete", jsonParser, async (req, res) => {
  try {
    const samples = await deleteReagentOnMethod(req.params.id, req.body);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/:id/device/delete", jsonParser, async (req, res) => {
  try {
    const samples = await deleteDeviceOnMethod(req.params.id, req.body);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id/device/update", async (req, res) => {
  try {
    const samples = await deleteDeviceOnMethod(req.params.id, req.body);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.get("/:id/samples", async (req, res) => {
  try {
    const samples = await getSamplesForMethod(req.params.id);
    res.send(samples);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const method = await createNewMethod(req.body);
    res.send(method);
  } catch (error) {
    console.log(error);
  }
});

methodRouter.post("/:id/update", jsonParser, async (req, res) => {
  try {
    const method = await updateMethod(req.params.id, req.body);
    res.send(method);
  } catch (error) {
    console.log(error);
  }
});

export { methodRouter };
