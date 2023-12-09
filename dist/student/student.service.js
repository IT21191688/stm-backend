"use strict";
// student.service.ts
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
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.findOne({ email: email });
});
const save = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudent = new student_model_1.default(studentData);
        const savedStudent = yield newStudent.save();
        return savedStudent;
    }
    catch (error) {
        console.error('Error saving student:', error);
        throw error;
    }
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.findById(id);
});
const generateQRCode = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentIdString = studentId.toString(); // Convert ObjectId to string
        const qrCodeDataURL = yield qrcode_1.default.toDataURL(studentIdString);
        return qrCodeDataURL;
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
});
const uploadQRImageToCloudinary = (studentId, qrImageURL) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload(qrImageURL.toString(), {
            public_id: `qr_${studentId}`,
            folder: 'student_qr_codes',
        });
        yield student_model_1.default.findByIdAndUpdate(studentId, { qrUrl: cloudinaryResponse.secure_url });
        return cloudinaryResponse.secure_url;
    }
    catch (error) {
        console.error('Error uploading QR image to Cloudinary:', error);
        throw error;
    }
});
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield student_model_1.default.find({});
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    findByEmail,
    save,
    findById,
    generateQRCode,
    uploadQRImageToCloudinary,
    getAllStudents
};
