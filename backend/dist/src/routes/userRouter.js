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
const category_1 = require("../database/category");
const reagent_1 = require("../database/reagent");
const device_1 = require("../database/device");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const jsonParser = body_parser_1.default.json();
userRouter.get("/current", (req, res) => {
    if (!req.isAuthenticated()) {
        res.json("");
    }
    else {
        res.send(req.user);
    }
});
// get, update, delete user by id
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, user_1.getUser)(req.params.id));
}));
userRouter.put("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, user_1.updateUser)(req.params.id, req.body));
}));
userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
userRouter.get("/:id/methods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const methods = yield (0, user_1.getMethodsForUser)(req.params.id);
        res.send(methods);
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.get("/:id/reagents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reagents = yield (0, reagent_1.getReagentsForUser)(req.params.id);
        res.send(reagents);
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.get("/:id/devices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield (0, device_1.getDevicesForUser)(req.params.id);
        res.send(devices);
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.get("/:id/categories-with-methods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_1.getCategoriesForUserWithMethods)(req.params.id);
        res.send(categories);
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.get("/:id/categories-no-methods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_1.getCategoriesForUser)(req.params.id);
        res.send(categories);
    }
    catch (error) {
        console.log(error);
    }
}));
