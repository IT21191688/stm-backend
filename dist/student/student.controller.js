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
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../util/response"));
const student_service_1 = __importDefault(require("../student/student.service"));
const user_service_1 = __importDefault(require("../user/user.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
const emailServer_1 = require("../util/emailServer");
const CreateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, age, grade, email, role, classes, payment, } = req.body;
        const auth = req.auth;
        const user = yield user_service_1.default.findById(auth._id);
        if (!user) {
            throw new NotFoundError_1.default('User not found!');
        }
        const studentData = {
            firstname,
            lastname,
            age,
            grade,
            email,
            role,
            classes,
            payment,
        };
        const createdStudent = yield student_service_1.default.save(studentData, null);
        // Generate QR code for the student
        const qrCode = yield student_service_1.default.generateQRCode(createdStudent.id); // Assuming generateQRCode function exists
        // Prepare email content
        const subject = 'Student QR Code';
        const htmlBody = email_templates_1.default.StudentQRCodeEmail({ fullName: 'User', qrCode });
        // Send email to the student's email address
        yield (0, emailServer_1.sendEmail)(email, subject, htmlBody, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Student created successfully!', createdStudent);
    }
    catch (error) {
        console.error('Error creating student:', error);
    }
});
exports.default = CreateStudent;
