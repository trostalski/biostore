import bodyParser from "body-parser";
import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../database/comment";

const commentRouter = express.Router();
const jsonParser = bodyParser.json();

commentRouter.get("/:id", async (req, res) => {
  try {
    const comment = await getComment(req.body);
    res.send(comment);
  } catch (error) {
    console.log(error);
  }
});

commentRouter.post("/:id/update", jsonParser, async (req, res) => {
  console.log(req.params.id);
  try {
    const comment = await updateComment(req.params.id, req.body);
    res.send(comment);
  } catch (error) {
    console.log(error);
  }
});

commentRouter.post("/:id/delete", async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id);
    res.send(comment);
  } catch (error) {
    console.log(error);
  }
});

commentRouter.post("/create", jsonParser, async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.send(comment);
  } catch (error) {
    console.log(error);
  }
});

export { commentRouter };
