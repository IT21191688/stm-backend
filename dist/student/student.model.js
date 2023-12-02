"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const StudentSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: [true, "first name is required"],
        maxlength: [100, "first name cannot be more than 50 characters"],
    },
    lastname: {
        type: String,
        required: [true, "last name is required"],
        maxlength: [100, "last name cannot be more than 50 characters"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    grade: {
        type: String,
        required: [true, "Grade is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        maxlength: [100, "Email cannot be more than 100 characters"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    profileImage: {
        type: String,
        required: [false]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: [constant_1.default.USER.ROLES.ADMIN, constant_1.default.USER.ROLES.USER],
            message: "Valid roles required",
        },
    },
    classes: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Class",
            },
        ],
    },
    payementType: {
        type: String,
        required: [true, "payementType is required"],
    },
    qrUrl: {
        type: String,
        required: [false, "qrUrl is required"],
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Student", StudentSchema);
