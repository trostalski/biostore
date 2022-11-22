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
exports.methodRouter = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const comment_1 = require("../database/comment");
const device_1 = require("../database/device");
const method_1 = require("../database/method");
const method_step_1 = require("../database/method-step");
const reagent_1 = require("../database/reagent");
const sample_1 = require("../database/sample");
const methodRouter = express_1.default.Router();
exports.methodRouter = methodRouter;
const jsonParser = body_parser_1.default.json();
methodRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const methods = yield (0, method_1.getAllMethods)();
        res.send(methods);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const method = yield (0, method_1.getMethod)(req.params.id);
        res.send(method);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/delete/unnamed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const methods = yield (0, method_1.deleteUnnamedMethods)();
        res.send(methods);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/:id/reagent/connect", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reagentOnMethod = yield (0, method_1.connectReagentToMethod)(req.params.id, req.body);
        res.send(reagentOnMethod);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/:id/device/connect", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceOnMethod = yield (0, method_1.connectDeviceToMethod)(req.params.id, req.body);
        res.send(deviceOnMethod);
    }
    catch (error) {
        console.log(error);
    }
}));
// connect multiple method with multiple reagents
methodRouter.post("/reagents/connect", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reagentOnMethod = yield (0, method_1.connectReagentsToMethods)(req.body);
        res.send(reagentOnMethod);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/devices/connect", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceOnMethod = yield (0, method_1.connectDevicesToMethods)(req.body);
        res.send(deviceOnMethod);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/reagents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, reagent_1.getReagentsForMethod)(req.params.id);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/devices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, device_1.getDevicesForMethod)(req.params.id);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/steps", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, method_step_1.getStepsForMethod)(req.params.id);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comment_1.getCommentsForMethod)(req.params.id);
        res.send(comments);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/:id/reagent/delete", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, method_1.deleteReagentOnMethod)(req.params.id, req.body);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/:id/device/delete", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, method_1.deleteDeviceOnMethod)(req.params.id, req.body);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/device/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, method_1.deleteDeviceOnMethod)(req.params.id, req.body);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.get("/:id/samples", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield (0, sample_1.getSamplesForMethod)(req.params.id);
        res.send(samples);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const method = yield (0, method_1.createNewMethod)(req.body);
        res.send(method);
    }
    catch (error) {
        console.log(error);
    }
}));
methodRouter.post("/:id/update", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const method = yield (0, method_1.updateMethod)(req.params.id, req.body);
        res.send(method);
    }
    catch (error) {
        console.log(error);
    }
}));
