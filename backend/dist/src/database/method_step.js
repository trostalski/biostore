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
exports.getMethodStep = exports.deleteMethodStep = exports.updateMethodStep = exports.createMethodStep = void 0;
const client_1 = __importDefault(require("./client"));
const createMethodStep = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method_step.create({
        data: {
            description: input.description,
            temperatur: input.temperatur,
            duration: input.duration,
            link: input.link,
            method_id: input.method_id,
        },
    });
});
exports.createMethodStep = createMethodStep;
const updateMethodStep = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.method_step.update({
        where: { id: +id },
        data: {
            description: input.description,
            temperatur: input.temperatur,
            duration: input.duration,
            link: input.link,
            method_id: input.method_id,
        },
    });
});
exports.updateMethodStep = updateMethodStep;
const deleteMethodStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method_step.delete({ where: { id: +id } });
});
exports.deleteMethodStep = deleteMethodStep;
const getMethodStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const method_step = yield client_1.default.method_step.findUnique({
        where: { id: +id },
    });
    return method_step;
});
exports.getMethodStep = getMethodStep;
