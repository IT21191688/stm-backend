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
const student_model_1 = __importDefault(require("../student/student.model"));
const class_model_1 = __importDefault(require("../class/class.model"));
// Function to create new attendance
const createAttendance = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAttendance = yield checkAttendanceExists(attendanceData.studentId, attendanceData.classId, attendanceData.month, attendanceData.year);
        if (!existingAttendance) {
            const newAttendance = yield attendance_model_1.default.create(attendanceData);
            return newAttendance;
        }
        else {
            //console.log("Exist")
        }
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
const checkAttendanceExists = (studentId, classId, month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAttendance = yield attendance_model_1.default.findOne({
        studentId: studentId,
        classId: classId,
        month: month,
        year: year,
    });
    return existingAttendance;
});
const fetchAssignedClasses = (studentId, month, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.default.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }
        const classIds = student.classes; // Get the array of class ids from the student
        const classDetails = yield class_model_1.default.find({ _id: { $in: classIds } }); // Retrieve class details using the class ids
        const attendancePromises = classDetails.map((classDetail) => __awaiter(void 0, void 0, void 0, function* () {
            const attendance = yield attendance_model_1.default.findOne({
                studentId: studentId,
                classId: classDetail._id,
                month: month,
                year: year,
            }); // Fetch attendance details for each class
            return Object.assign(Object.assign({}, classDetail.toObject()), { attendance });
        }));
        const classesWithAttendance = yield Promise.all(attendancePromises);
        // console.log(classesWithAttendance);
        return classesWithAttendance;
    }
    catch (error) {
        console.error('Error fetching assigned classes:', error);
        throw new Error('Error fetching assigned classes');
    }
});
exports.default = {
    createAttendance,
    updateAttendance,
    getAttendanceByStudentClassAndMonth,
    checkAttendanceExists,
    fetchAssignedClasses
};
