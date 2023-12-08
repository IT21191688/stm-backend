"use strict";
// attendance.routes.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_controller_1 = require("./attendance.controller");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const express_1 = require("express");
const attendanceRouter = (0, express_1.Router)();
attendanceRouter.post('/createAttendance', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), attendance_controller_1.createAttendance);
attendanceRouter.patch('/updateAttendance/:id', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), attendance_controller_1.updateAttendance);
attendanceRouter.get('/getAttendance/:studentId/:classId/:month/:year', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), attendance_controller_1.getAttendanceByStudentClassAndMonth);
attendanceRouter.get('/getAttendancewithAssignClasses/:studentId/:month/:year', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), attendance_controller_1.getClassDetailsWithAttendance);
exports.default = attendanceRouter;
