import express, { Express } from "express";
import session from "express-session";
import cors from "cors";
import { userRouter } from "./src/routes/userRouter";
import { authRouter } from "./src/routes/authRouter";
import passport from "passport";
import { methodRouter } from "./src/routes/methodRouter";
import { categoryRouter } from "./src/routes/categoryRouter";
import { reagentRouter } from "./src/routes/reagentRouter";
import { deviceRouter } from "./src/routes/deviceRouter";
import { sampleRouter } from "./src/routes/sampleRouter";
import { stepRouter } from "./src/routes/stepRouter";
import { commentRouter } from "./src/routes/commentRouter";

const port: number = 8001;
const app: Express = express();

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 }, // 30 mins
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/method", methodRouter);
app.use("/category", categoryRouter);
app.use("/reagent", reagentRouter);
app.use("/device", deviceRouter);
app.use("/sample", sampleRouter);
app.use("/step", stepRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
