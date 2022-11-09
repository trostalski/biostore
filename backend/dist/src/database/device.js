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
exports.getCategory = exports.deleteCategory = exports.updateReagent = exports.createDevice = void 0;
const client_1 = __importDefault(require("./client"));
const createDevice = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.device.create({
        data: {
            name: input.name,
            company: input.company,
            product_id: input.product_id,
        },
    });
});
exports.createDevice = createDevice;
const updateReagent = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.device.update({
        where: { id: +id },
        data: {
            name: input.name,
            company: input.company,
            product_id: input.product_id,
        },
    });
});
exports.updateReagent = updateReagent;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.device.delete({ where: { id: +id } });
});
exports.deleteCategory = deleteCategory;
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reagent = yield client_1.default.device.findUnique({ where: { id: +id } });
    return reagent;
});
exports.getCategory = getCategory;
