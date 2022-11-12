import express, { Router } from "express";
import bodyParser from "body-parser";
import {
  createUser,
  deleteUser,
  getMethodsForUser,
  getUser,
  updateUser,
} from "../database/user";
import { loggedIn } from "../auth/middleware";
import {
  getCategoriesForUser,
  getCategoriesForUserWithMethods,
} from "../database/category";

const userRouter: Router = express.Router();
const jsonParser = bodyParser.json();

userRouter.get("/current", (req, res) => {
  if (!req.isAuthenticated()) {
    res.json("");
  } else {
    res.send(req.user);
  }
});

// get, update, delete user by id
userRouter.get("/:id", async (req, res) => {
  console.log(req.params.id);
  res.send(await getUser(req.params.id));
});

userRouter.put("/:id", jsonParser, async (req, res) => {
  res.send(await updateUser(req.params.id, req.body));
});

userRouter.delete("/:id", async (req, res) => {
  res.send(await deleteUser(req.params.id));
});

// create new user
userRouter.post("/create", jsonParser, async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error: any) {
    if (error.message == "Username already taken.") {
      res.status(409).send(error.message);
    } else {
      next(error);
    }
  }
});

userRouter.get("/:id/methods", async (req, res) => {
  try {
    const methods = await getMethodsForUser(req.params.id);
    res.send(methods);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id/categories", loggedIn, async (req, res) => {
  try {
    const categories = await getCategoriesForUserWithMethods(req.params.id);
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
