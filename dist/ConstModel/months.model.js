"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MonthSchema = new mongoose_1.default.Schema({
    month: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Year',
        required: true,
    },
    // Add other necessary fields specific to your use case
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Month', MonthSchema);
