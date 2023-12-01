"use strict";
// student.controller.ts
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
exports.DeleteStudentDeteils = exports.UpdateStudentDetails = exports.GetStudentDetails = exports.CreateStudent = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../util/response"));
const student_service_1 = __importDefault(require("../student/student.service"));
const user_service_1 = __importDefault(require("../user/user.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const emailServer_1 = require("../util/emailServer");
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
const constant_1 = __importDefault(require("../constant"));
const CreateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, age, grade, profileImage, email, role, classes, payment, } = req.body;
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
            profileImage,
            email,
            role,
            classes,
            payment,
        };
        // Save the student details
        const createdStudent = yield student_service_1.default.save(studentData);
        // Generate QR code for the student using the student ID
        const qrCodeDataURL = yield student_service_1.default.generateQRCode(createdStudent._id);
        // Upload the QR code image to Cloudinary
        const cloudinaryURL = yield student_service_1.default.uploadQRImageToCloudinary(createdStudent._id, qrCodeDataURL);
        // Prepare and send email content
        const subject = 'Student QR Code';
        const htmlBody = email_templates_1.default.StudentQRCodeEmail({ fullName: 'User', qrCode: cloudinaryURL });
        // Send email to the student's email address
        yield (0, emailServer_1.sendEmail)(email, subject, htmlBody, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Student created successfully!', createdStudent);
    }
    catch (error) {
        console.error('Error creating student:', error);
        // Handle the error or send an appropriate response
        // CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create student');
    }
});
exports.CreateStudent = CreateStudent;
const GetStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const auth = req.auth;
        //console.log(studentId)
        const student = yield student_service_1.default.findById(studentId);
        if (!student) {
            throw new NotFoundError_1.default("Student not found!");
        }
        /*
        if (student.addedBy.toString() !== auth._id) {
          throw new ForbiddenError("You are not authorized to view this student!");
        }
      */
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Student details retrieved successfully!", student);
    }
    catch (e) {
        // Handle any errors that may occur during the process
        throw e;
    }
});
exports.GetStudentDetails = GetStudentDetails;
const UpdateStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const auth = req.auth;
    const body = req.body;
    const student = yield student_service_1.default.findById(studentId);
    if (!student)
        throw new NotFoundError_1.default("Student not found!");
    //let today = new Date();
    //updating process
    for (let key in body) {
        if (key !== "addedBy") {
            student[key] = body[key];
        }
    }
    try {
        yield student_service_1.default.save(student);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Student updated successfully!", student);
    }
    catch (e) {
        throw e;
    }
});
exports.UpdateStudentDetails = UpdateStudentDetails;
const DeleteStudentDeteils = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const auth = req.auth;
    const student = yield student_service_1.default.findById(studentId);
    console.log(studentId);
    if (!student)
        throw new NotFoundError_1.default("Student not found!");
    student.status = constant_1.default.WELLKNOWNSTATUS.INACTIVE;
    try {
        yield student_service_1.default.save(student);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Student deleted successfully!", null);
    }
    catch (e) {
        throw e;
    }
});
exports.DeleteStudentDeteils = DeleteStudentDeteils;
