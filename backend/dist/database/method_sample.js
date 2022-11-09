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
exports.getMethodSample = exports.deleteMethodSample = exports.updateMethodSample = exports.createMethodSample = void 0;
const client_1 = __importDefault(require("./client"));
const createMethodSample = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method_sample.create({
        data: {
            condition_key: input.condition_key,
            condition_value: input.condition_value,
            method_id: input.method_id,
        },
    });
});
exports.createMethodSample = createMethodSample;
const updateMethodSample = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.method_sample.update({
        where: { id: +id },
        data: {
            condition_key: input.condition_key,
            condition_value: input.condition_value,
            method_id: input.method_id,
        },
    });
});
exports.updateMethodSample = updateMethodSample;
const deleteMethodSample = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method_sample.delete({ where: { id: +id } });
});
exports.deleteMethodSample = deleteMethodSample;
const getMethodSample = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const method_sample = yield client_1.default.method_sample.findUnique({
        where: { id: +id },
    });
    return method_sample;
});
exports.getMethodSample = getMethodSample;
