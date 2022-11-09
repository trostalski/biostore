import express from "express";
import passport from "passport";
import { getUserByUsername } from "../database/user";
import Local from "passport-local";

const authRouter = express.Router();

passport.serializeUser((user: any, done) => {
  return done(null, user.username);
});

passport.deserializeUser((username: string, done) => {
  getUserByUsername(username)
    .then((res) => {
      if (res) {
        done(null, res);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

passport.use(
  new Local.Strategy(function verify(username: string, password: string, done) {
    getUserByUsername(username)
      .then((user) => {
        if (user && user.password == password) {
          done(null, user);
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .catch((error) => {
        done(error);
      });
  })
);

authRouter.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  (req, res) => {
    res.sendStatus(200);
  }
);

export { authRouter };
