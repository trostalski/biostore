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
import { getReagentsForUser } from "../database/reagent";
import Prisma from "@prisma/client";
import { getDevicesForUser } from "../database/device";

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
    const methods: Prisma.method[] = await getMethodsForUser(req.params.id);
    res.send(methods);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id/reagents", async (req, res) => {
  try {
    const reagents: Prisma.reagent[] | false = await getReagentsForUser(
      req.params.id
    );
    res.send(reagents);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id/devices", async (req, res) => {
  try {
    const devices: Prisma.device[] | false = await getDevicesForUser(
      req.params.id
    );
    res.send(devices);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id/categories-with-methods", async (req, res) => {
  try {
    const categories: Prisma.category[] = await getCategoriesForUserWithMethods(
      req.params.id
    );
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id/categories-no-methods", async (req, res) => {
  try {
    const categories: Prisma.category[] = await getCategoriesForUser(
      req.params.id
    );
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
