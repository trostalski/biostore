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
exports.getMethodsForUser = exports.getUserByUsername = exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const client_1 = __importDefault(require("./client"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const userCount = yield client_1.default.user.count({
        where: { username: input.username },
    });
    if (userCount) {
        throw new Error("Username already taken.");
    }
    else {
        const user = yield client_1.default.user.create({
            data: {
                first_name: input.first_name,
                last_name: input.last_name,
                username: input.username,
                password: input.password,
                expertise: input.expertise,
            },
        });
        return user;
    }
});
exports.createUser = createUser;
const updateUser = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.user.update({
        where: { id: +id },
        data: {
            first_name: input.first_name,
            last_name: input.last_name,
            expertise: input.expertise,
        },
    });
    return updatedUser;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.user.delete({ where: { id: +id } });
});
exports.deleteUser = deleteUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: +id },
    });
    return user;
});
exports.getUser = getUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { username: username },
    });
    return user;
});
exports.getUserByUsername = getUserByUsername;
const getMethodsForUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const methods = yield client_1.default.method.findMany({ where: { creator_id: +id } });
    return methods;
});
exports.getMethodsForUser = getMethodsForUser;
