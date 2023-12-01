"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true,
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentMonth: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'PaymentMonth',
        required: true,
    },
    paymentYear: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'PaymentYear',
        required: true,
    },
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Other necessary fields specific to your use case
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Payment', PaymentSchema);
