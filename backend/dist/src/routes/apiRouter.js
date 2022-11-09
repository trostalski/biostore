"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../database/user");
const passport_local_1 = __importDefault(require("passport-local"));
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
passport_1.default.serializeUser((user, done) => {
    done(null, user.username);
});
passport_1.default.deserializeUser((username, done) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, user_1.getUserByUsername)(username);
    if (result) {
        done(null, result);
    }
}));
passport_1.default.use(new passport_local_1.default.Strategy(function (username, password, done) {
    console.log(username);
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
apiRouter.post("/login", passport_1.default.authenticate("local"), (req, res, next) => {
    console.log(req.body);
    res.send(200);
});
