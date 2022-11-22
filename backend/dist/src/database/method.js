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
exports.deleteDeviceOnMethod = exports.deleteReagentOnMethod = exports.connectDevicesToMethods = exports.connectReagentsToMethods = exports.connectDeviceToMethod = exports.connectReagentToMethod = exports.getAllMethods = exports.getMethod = exports.deleteUnnamedMethods = exports.deleteMethod = exports.updateMethod = exports.createNewMethod = exports.createMethod = void 0;
const client_1 = __importDefault(require("./client"));
const createMethod = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const method = yield client_1.default.method.create({
        data: {
            name: input.name,
            duration: input.duration,
            description: input.description,
            sections: input.sections,
            number_of_samples: +input.number_of_samples,
            creator_id: input.creator_id,
            category_id: +input.category_id,
        },
    });
    return method;
});
exports.createMethod = createMethod;
const createNewMethod = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // construct new date to generate a unique name for the new method
    const method = yield client_1.default.method.create({
        data: {
            name: "",
            creator: { connect: { id: +input.creator_id } },
            category: {
                connectOrCreate: {
                    where: { name: "All Methods" },
                    create: { name: "All Methods", user_id: input.creator_id },
                },
            },
        },
    });
    return method;
});
exports.createNewMethod = createNewMethod;
const updateMethod = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(JSON.stringify(input));
    const updatedMethod = yield client_1.default.method.update({
        where: { id: +id },
        data: {
            name: input.name,
            duration: input.duration,
            description: input.description,
            sections: input.sections,
            number_of_samples: +input.number_of_samples,
            category_id: +input.category_id,
        },
    });
    return updatedMethod;
});
exports.updateMethod = updateMethod;
const deleteMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method.delete({ where: { id: +id } });
});
exports.deleteMethod = deleteMethod;
const deleteUnnamedMethods = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.method.deleteMany({ where: { name: "" } });
});
exports.deleteUnnamedMethods = deleteUnnamedMethods;
const getMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const method = yield client_1.default.method.findUnique({ where: { id: +id } });
    return method;
});
exports.getMethod = getMethod;
const getAllMethods = () => __awaiter(void 0, void 0, void 0, function* () {
    const methods = yield client_1.default.method.findMany();
    return methods;
});
exports.getAllMethods = getAllMethods;
const connectReagentToMethod = (methodId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client_1.default.reagents_on_methods.create({
        data: { method_id: +methodId, reagent_id: input.reagent_id },
    });
    return res;
});
exports.connectReagentToMethod = connectReagentToMethod;
const connectDeviceToMethod = (methodId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client_1.default.devices_on_methods.create({
        data: { method_id: +methodId, device_id: input.device_id },
    });
    return res;
});
exports.connectDeviceToMethod = connectDeviceToMethod;
const connectReagentsToMethods = (input) => __awaiter(void 0, void 0, void 0, function* () {
    //input should be of format [{method_id: method_id, reagent_id: reagent_id}]
    const res = yield client_1.default.reagents_on_methods.createMany({
        data: input,
    });
    return res;
});
exports.connectReagentsToMethods = connectReagentsToMethods;
const connectDevicesToMethods = (input) => __awaiter(void 0, void 0, void 0, function* () {
    //input should be of format [{method_id: method_id, reagent_id: reagent_id}]
    const res = yield client_1.default.devices_on_methods.createMany({
        data: input,
    });
    return res;
});
exports.connectDevicesToMethods = connectDevicesToMethods;
const deleteReagentOnMethod = (methodId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client_1.default.reagents_on_methods.delete({
        where: {
            reagent_id_method_id: { method_id: +methodId, reagent_id: input.id },
        },
    });
    return res;
});
exports.deleteReagentOnMethod = deleteReagentOnMethod;
const deleteDeviceOnMethod = (methodId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client_1.default.devices_on_methods.delete({
        where: {
            device_id_method_id: { method_id: +methodId, device_id: input.id },
        },
    });
    return res;
});
exports.deleteDeviceOnMethod = deleteDeviceOnMethod;
