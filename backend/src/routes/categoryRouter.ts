import bodyParser from "body-parser";
import express from "express";
import { loggedIn } from "../auth/middleware";
import {
  createCategory,
  deleteCategory,
  getCategory,
} from "../database/category";

const categoryRouter = express.Router();
const jsonParser = bodyParser.json();

categoryRouter.get("/:id", loggedIn, async (req, res) => {
  try {
    const category = await getCategory(req.body);
    res.send(category);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.post("/:id/delete", async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id);
    res.send(category);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.send(category);
  } catch (error) {
    console.log(error);
  }
});

export { categoryRouter };
