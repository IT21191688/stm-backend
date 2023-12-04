"use strict";
// attendance.model.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    days: [{
            date: {
                type: Date,
                required: true,
            },
            attended: {
                type: Boolean,
                default: false,
            },
        }],
});
const Attendance = mongoose_1.default.model('Attendance', AttendanceSchema);
exports.default = Attendance;
