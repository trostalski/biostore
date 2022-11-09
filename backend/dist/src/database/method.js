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
exports.getMethod = exports.deleteMethod = exports.updateMethod = exports.createMethod = void 0;
const client_1 = __importDefault(require("./client"));
const createMethod = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const method = yield client_1.default.method.create({
        data: {
            name: input.name,
            duration: input.duration,
            description: input.description,
            sections: input.sections,
            comments: input.comments,
            number_of_samples: input.number_of_samples,
            creator_id: input.creator_id,
            category_id: input.category_id,
        },
    });
    return method;
});
exports.createMethod = createMethod;
const updateMethod = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.method.update({
        where: { id: +id },
        data: {
            name: input.name,
            duration: input.duration,
            description: input.description,
            sections: input.sections,
            comments: input.comments,
            number_of_samples: input.number_of_samples,
            creator_id: input.creator_id,
            category_id: input.category_id,
        },
    });
});
exports.updateMethod = updateMethod;
const deleteMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method.delete({ where: { id: +id } });
});
exports.deleteMethod = deleteMethod;
const getMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const method = yield client_1.default.method.findUnique({ where: { id: +id } });
    return method;
});
exports.getMethod = getMethod;
