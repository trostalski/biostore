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
exports.getReagentsForMethod = exports.getAllReagents = exports.getReagentsForUser = exports.getReagent = exports.deleteReagent = exports.updateReagent = exports.createReagent = void 0;
const client_1 = __importDefault(require("./client"));
const createReagent = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const reagent = yield client_1.default.reagent.create({
        data: {
            name: input.name,
            company: input.company,
            product_id: input.product_id,
            user_id: input.user_id,
            link: input.link,
            type: input.type,
        },
    });
    if (input.method_id) {
        yield client_1.default.reagents_on_methods.create({
            data: {
                method_id: input.method_id,
                reagent_id: reagent.id,
                amount: input.amount,
            },
        });
    }
    return reagent;
});
exports.createReagent = createReagent;
const updateReagent = (reagentId, input, methodId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReagent = yield client_1.default.reagent.update({
        where: { id: +reagentId },
        data: {
            name: input.name,
            company: input.company,
            product_id: input.product_id,
            user_id: input.user_id,
            link: input.link,
            type: input.type,
        },
    });
    if (input.amount && input.method_id) {
        client_1.default.reagents_on_methods.update({
            where: {
                reagent_id_method_id: { method_id: +methodId, reagent_id: +reagentId },
            },
            data: { amount: input.amount },
        });
    }
    return updatedReagent;
});
exports.updateReagent = updateReagent;
const deleteReagent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reagent = yield client_1.default.reagent.delete({ where: { id: +id } });
    return reagent;
});
exports.deleteReagent = deleteReagent;
const getReagent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reagent = yield client_1.default.reagent.findUnique({
        where: { id: +id },
    });
    return reagent;
});
exports.getReagent = getReagent;
const getReagentsForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reagents = yield client_1.default.reagent.findMany({
        where: { user_id: +userId },
        include: { methods: true },
    });
    return reagents;
});
exports.getReagentsForUser = getReagentsForUser;
const getAllReagents = () => __awaiter(void 0, void 0, void 0, function* () {
    const reagents = yield client_1.default.reagent.findMany();
    return reagents;
});
exports.getAllReagents = getAllReagents;
const getReagentsForMethod = (methodId) => __awaiter(void 0, void 0, void 0, function* () {
    const reagents = yield client_1.default.reagents_on_methods.findMany({
        where: { method_id: +methodId },
        select: { reagent: true, amount: true },
    });
    return reagents;
});
exports.getReagentsForMethod = getReagentsForMethod;
