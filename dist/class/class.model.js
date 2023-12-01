"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassSchema = new mongoose_1.default.Schema({
    className: {
        type: String,
        required: true,
        maxlength: 100,
    },
    classGrade: {
        type: String,
        required: true,
        maxlength: 50,
    },
    teacherName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
    },
    // Other necessary fields specific to your use case
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Class', ClassSchema);
