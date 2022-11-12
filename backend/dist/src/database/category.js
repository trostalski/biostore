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
exports.getCategoriesForUserWithMethods = exports.getCategoriesForUser = exports.getCategory = exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const client_1 = __importDefault(require("./client"));
const createCategory = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.create({
        data: {
            name: input.name,
            user_id: input.user_id,
        },
    });
    return category;
});
exports.createCategory = createCategory;
const updateCategory = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.category.update({
        where: { id: +id },
        data: {
            name: input.name,
        },
    });
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.delete({
        where: { id: +id },
    });
    return category;
});
exports.deleteCategory = deleteCategory;
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.findUnique({
        where: { id: +id },
    });
    return category;
});
exports.getCategory = getCategory;
const getCategoriesForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield client_1.default.category.findMany({
        where: { user_id: +userId },
    });
    return categories;
});
exports.getCategoriesForUser = getCategoriesForUser;
const getCategoriesForUserWithMethods = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield client_1.default.category.findMany({
        where: { user_id: +userId },
        include: { methods: true },
    });
    return categories;
});
exports.getCategoriesForUserWithMethods = getCategoriesForUserWithMethods;
