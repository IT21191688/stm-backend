"use strict";
// attendance.service.js
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
const attendance_model_1 = __importDefault(require("../attendance/attendance.model"));
// Function to create new attendance
const createAttendance = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAttendance = yield attendance_model_1.default.create(attendanceData);
        return newAttendance;
    }
    catch (error) {
        throw new Error('Could not create attendance');
    }
});
const updateAttendance = (id, attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAttendance = yield attendance_model_1.default.findByIdAndUpdate(id, attendanceData, { new: true });
        if (!updatedAttendance) {
            throw new Error('Attendance not found');
        }
        return updatedAttendance;
    }
    catch (error) {
        throw new Error('Could not update attendance');
    }
});
const getAttendanceByStudentClassAndMonth = (studentId, classId, month, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Implement logic to fetch attendance by student, class, and month
        const attendance = yield attendance_model_1.default.find({
            studentId,
            classId,
            month,
            year,
        });
        return attendance;
    }
    catch (error) {
        throw new Error('Could not retrieve attendance');
    }
});
exports.default = {
    createAttendance,
    updateAttendance,
    getAttendanceByStudentClassAndMonth
};
