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
const student_model_1 = __importDefault(require("../student/student.model"));
const qrcode_1 = __importDefault(require("qrcode"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.findOne({ email: email });
});
const save = (student, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield student.save({ session });
    }
    else {
        return yield student.save();
    }
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.findById(id).populate('classes');
});
const generateQRCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate QR code as a data URL
        const qrCodeDataURL = yield qrcode_1.default.toDataURL(data);
        return qrCodeDataURL;
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
});
exports.default = {
    findByEmail,
    save,
    findById,
    generateQRCode
};
