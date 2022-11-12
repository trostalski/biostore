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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../database/user");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const jsonParser = body_parser_1.default.json();
// get, update, delete user by id
userRouter
    .route("/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, user_1.getUser)(req.params.id));
}))
    .put(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, user_1.updateUser)(req.params.id, req.body));
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, user_1.deleteUser)(req.params.id));
}));
// create new user
userRouter.post("/create", jsonParser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_1.createUser)(req.body);
        res.send(user);
    }
    catch (error) {
        if (error.message == "Username already taken.") {
            res.status(409).send(error.message);
        }
        else {
            next(error);
        }
    }
}));