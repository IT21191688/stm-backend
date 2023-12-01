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
const class_model_1 = __importDefault(require("./class.model"));
const createClass = (classData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClass = new class_model_1.default(classData);
        const savedClass = yield newClass.save();
        return savedClass;
    }
    catch (error) {
        throw error;
    }
});
const getAllClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield class_model_1.default.find({});
    }
    catch (error) {
        throw error;
    }
});
const getClassById = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield class_model_1.default.findById(classId);
    }
    catch (error) {
        throw error;
    }
});
const updateClass = (classId, classData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield class_model_1.default.findByIdAndUpdate(classId, classData, { new: true });
    }
    catch (error) {
        throw error;
    }
});
const deleteClass = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield class_model_1.default.findByIdAndDelete(classId);
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
};
