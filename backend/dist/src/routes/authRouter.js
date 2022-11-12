"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../database/user");
const passport_local_1 = __importDefault(require("passport-local"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
passport_1.default.serializeUser((user, done) => {
    return done(null, user.username);
});
passport_1.default.deserializeUser((username, done) => {
    (0, user_1.getUserByUsername)(username)
        .then((res) => {
        if (res) {
            done(null, res);
        }
    })
        .catch((error) => {
        console.log(error);
    });
});
passport_1.default.use(new passport_local_1.default.Strategy(function verify(username, password, done) {
    (0, user_1.getUserByUsername)(username)
        .then((user) => {
        if (user && user.password == password) {
            done(null, user);
        }
        else {
            throw new Error("Invalid username or password");
        }
    })
        .catch((error) => {
        done(error);
    });
}));
authRouter.post("/login", passport_1.default.authenticate("local", { failureMessage: true }), (req, res) => {
    res.send(req.user);
});
authRouter.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
});
