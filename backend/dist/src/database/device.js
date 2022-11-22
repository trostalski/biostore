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
exports.getDevicesForMethod = exports.getAllDevices = exports.getDevicesForUser = exports.getDevice = exports.deleteDevice = exports.updateDevice = exports.createDevice = void 0;
const client_1 = __importDefault(require("./client"));
const createDevice = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield client_1.default.device.create({
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
        yield client_1.default.devices_on_methods.create({
            data: {
                method_id: input.method_id,
                device_id: device.id,
            },
        });
    }
    return device;
});
exports.createDevice = createDevice;
const updateDevice = (deviceId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDevice = yield client_1.default.device.update({
        where: { id: +deviceId },
        data: {
            name: input.name,
            company: input.company,
            product_id: input.product_id,
            user_id: input.user_id,
            link: input.link,
            type: input.type,
        },
    });
    return updatedDevice;
});
exports.updateDevice = updateDevice;
const deleteDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield client_1.default.device.delete({ where: { id: +id } });
    return device;
});
exports.deleteDevice = deleteDevice;
const getDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield client_1.default.device.findUnique({
        where: { id: +id },
    });
    return device;
});
exports.getDevice = getDevice;
const getDevicesForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const Devices = yield client_1.default.device.findMany({
        where: { user_id: +userId },
        include: { methods: true },
    });
    return Devices;
});
exports.getDevicesForUser = getDevicesForUser;
const getAllDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield client_1.default.device.findMany();
    return devices;
});
exports.getAllDevices = getAllDevices;
const getDevicesForMethod = (methodId) => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield client_1.default.devices_on_methods.findMany({
        where: { method_id: +methodId },
        select: { device: true },
    });
    return devices;
});
exports.getDevicesForMethod = getDevicesForMethod;
