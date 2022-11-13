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
exports.reagentRouter = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../auth/middleware");
const reagent_1 = require("../database/reagent");
const reagentRouter = express_1.default.Router();
exports.reagentRouter = reagentRouter;
const jsonParser = body_parser_1.default.json();
reagentRouter.get("/:id", middleware_1.loggedIn, (req, res) => {
    res.send(req.params.id);
});
reagentRouter.delete("/:id", middleware_1.loggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReagent = yield (0, reagent_1.deleteReagent)(req.params.id);
        res.send(deletedReagent);
    }
    catch (error) {
        console.log(error);
    }
}));
reagentRouter.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reagent = yield (0, reagent_1.createReagent)(req.body);
        res.send(reagent);
    }
    catch (error) {
        console.log(error);
    }
}));
