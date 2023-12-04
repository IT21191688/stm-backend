"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const attendanceService = __importStar(require("../attendance/attendance.service"));
const response_1 = __importDefault(require("../util/response"));
const http_status_codes_1 = require("http-status-codes");
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceData = req.body;
        const attendance = yield attendanceService.createAttendance(attendanceData);
        return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Attendance created successfully', attendance);
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
        const updatedAttendance = yield attendanceService.updateAttendance(id, attendanceData);
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
        const attendance = yield attendanceService.getAttendanceByStudentClassAndMonth(studentId, classId, month, year);
        return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Attendance retrieved successfully', attendance);
    }
    catch (error) {
        return (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getAttendanceByStudentClassAndMonth = getAttendanceByStudentClassAndMonth;
