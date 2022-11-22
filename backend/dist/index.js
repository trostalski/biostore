"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./src/routes/userRouter");
const authRouter_1 = require("./src/routes/authRouter");
const passport_1 = __importDefault(require("passport"));
const methodRouter_1 = require("./src/routes/methodRouter");
const categoryRouter_1 = require("./src/routes/categoryRouter");
const reagentRouter_1 = require("./src/routes/reagentRouter");
const deviceRouter_1 = require("./src/routes/deviceRouter");
const sampleRouter_1 = require("./src/routes/sampleRouter");
const stepRouter_1 = require("./src/routes/stepRouter");
const commentRouter_1 = require("./src/routes/commentRouter");
const port = 8001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 }, // 30 mins
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.authenticate("session"));
app.use("/user", userRouter_1.userRouter);
app.use("/auth", authRouter_1.authRouter);
app.use("/method", methodRouter_1.methodRouter);
app.use("/category", categoryRouter_1.categoryRouter);
app.use("/reagent", reagentRouter_1.reagentRouter);
app.use("/device", deviceRouter_1.deviceRouter);
app.use("/sample", sampleRouter_1.sampleRouter);
app.use("/step", stepRouter_1.stepRouter);
app.use("/comment", commentRouter_1.commentRouter);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
