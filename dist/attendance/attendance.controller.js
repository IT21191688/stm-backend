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
exports.getAttendanceByStudentClassAndMonth = exports.updateAttendance = exports.createAttendance = void 0;
const attendance_service_1 = __importDefault(require("../attendance/attendance.service"));
const response_1 = __importDefault(require("../util/response"));
const http_status_codes_1 = require("http-status-codes");
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceData = req.body;
        const existingAttendance = yield attendance_service_1.default.checkAttendanceExists(attendanceData.studentId, attendanceData.classId, attendanceData.month, attendanceData.year);
        console.log(attendanceData.studentId);
        if (!existingAttendance) {
            const attendance = yield attendance_service_1.default.createAttendance(attendanceData);
            return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Attendance created successfully', attendance);
        }
        else {
            console.log("exist");
        }
    }
    catch (error) {
        return (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.createAttendance = createAttendance;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const attendanceData = req.body;
        const updatedAttendance = yield attendance_service_1.default.updateAttendance(id, attendanceData);
        return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Attendance updated successfully', updatedAttendance);
    }
    catch (error) {
        return (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.updateAttendance = updateAttendance;
const getAttendanceByStudentClassAndMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, classId, month, year } = req.params;
        const attendance = yield attendance_service_1.default.getAttendanceByStudentClassAndMonth(studentId, classId, month, year);
        return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Attendance retrieved successfully', attendance);
    }
    catch (error) {
        return (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getAttendanceByStudentClassAndMonth = getAttendanceByStudentClassAndMonth;
