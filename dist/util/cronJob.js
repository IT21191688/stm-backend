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
exports.scheduleAutomaticAttendance = exports.scheduleAutomaticPayments = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../student/student.model"));
const class_model_1 = __importDefault(require("../class/class.model"));
const payment_service_1 = __importDefault(require("../payment/payment.service"));
const attendance_service_1 = __importDefault(require("../attendance/attendance.service"));
const generatePayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all students
        const allStudents = yield student_model_1.default.find().populate('classes');
        for (const student of allStudents) {
            const studentClassIds = student.classes.map((classRef) => classRef._id);
            for (const classId of studentClassIds) {
                // Find the class details by ID
                const classDetails = yield class_model_1.default.findById(classId);
                //console.log(classDetails)
                if (classDetails) {
                    const paymentData = {
                        paymentId: new mongoose_1.default.Types.ObjectId(),
                        studentId: student._id,
                        paymentDate: new Date(), // Current date
                        paymentMonth: new Date().toLocaleString('default', { month: 'long' }),
                        paymentYear: new Date().getFullYear().toString(), // 
                        classId: classDetails._id,
                        paymentType: student.payementType,
                        paymentStatus: 'Not Paid'
                    };
                    yield payment_service_1.default.createPayment(paymentData);
                }
            }
        }
        // console.log('Payments generated successfully for all students based on their classes.');
    }
    catch (error) {
        console.error('Error generating payments:', error);
        throw error;
    }
});
//every minite * * * * *
//1st day of month 0 0 1 * *
const scheduleAutomaticPayments = () => {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield generatePayments(); // Call the function for generating payments
        }
        catch (error) {
            console.error('Error in automatic payment generation:', error);
        }
    }), {
        scheduled: true,
        timezone: 'Asia/Colombo',
    });
};
exports.scheduleAutomaticPayments = scheduleAutomaticPayments;
const createAttendanceForAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStudents = yield student_model_1.default.find().populate('classes');
        allStudents.forEach((student) => __awaiter(void 0, void 0, void 0, function* () {
            for (const classItem of student.classes) {
                const currentDate = new Date();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                const attendanceData = {
                    studentId: student._id,
                    classId: classItem._id,
                    month: month,
                    year: year,
                };
                yield attendance_service_1.default.createAttendance(attendanceData);
            }
        }));
        //console.log('Attendance created for all students in their classes.');
    }
    catch (error) {
        console.error('Error creating attendance:', error);
    }
});
const scheduleAutomaticAttendance = () => {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield createAttendanceForAllStudents(); // Call the function to create attendance
        }
        catch (error) {
            console.error('Error in automatic attendance creation:', error);
        }
    }), {
        scheduled: true,
        timezone: 'Asia/Colombo',
    });
};
exports.scheduleAutomaticAttendance = scheduleAutomaticAttendance;
