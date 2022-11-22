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
exports.categoryRouter = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const category_1 = require("../database/category");
const categoryRouter = express_1.default.Router();
exports.categoryRouter = categoryRouter;
const jsonParser = body_parser_1.default.json();
categoryRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_1.getCategory)(req.body);
        res.send(category);
    }
    catch (error) {
        console.log(error);
    }
}));
categoryRouter.post("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_1.deleteCategory)(req.params.id);
        res.send(category);
    }
    catch (error) {
        console.log(error);
    }
}));
categoryRouter.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_1.createCategory)(req.body);
        res.send(category);
    }
    catch (error) {
        console.log(error);
    }
}));
