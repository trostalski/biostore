import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import { createReagent, deleteReagent } from "../database/reagent";

const reagentRouter = express.Router();
const jsonParser = bodyParser.json();

reagentRouter.get("/:id", loggedIn, (req, res) => {
  res.send(req.params.id);
});

reagentRouter.delete("/:id", loggedIn, async (req, res) => {
  try {
    const deletedReagent = await deleteReagent(req.params.id);
    res.send(deletedReagent);
  } catch (error) {
    console.log(error);
  }
});

reagentRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const reagent = await createReagent(req.body);
    res.send(reagent);
  } catch (error) {
    console.log(error);
  }
});
export { reagentRouter };
