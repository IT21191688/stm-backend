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
exports.deleteClass = exports.updateClass = exports.getClassById = exports.getAllClasses = exports.createClass = void 0;
const http_status_codes_1 = require("http-status-codes");
const class_service_1 = __importDefault(require("../class/class.service"));
const response_1 = __importDefault(require("../util/response"));
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, classGrade, teacher, price } = req.body;
        //should impliment if valid teacher id
        const classData = { className, classGrade, teacher, price };
        const newClass = yield class_service_1.default.createClass(classData);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Class created successfully!', newClass);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.createClass = createClass;
const getAllClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allClasses = yield class_service_1.default.getAllClasses();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Classes retrieved successfully!', allClasses);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getAllClasses = getAllClasses;
const getClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = req.params.classId;
        const classFound = yield class_service_1.default.getClassById(classId);
        if (!classFound) {
            (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, 'Class not found!', null);
        }
        else {
            (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Class retrieved successfully!', classFound);
        }
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getClassById = getClassById;
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = req.params.classId;
        const updatedClass = yield class_service_1.default.updateClass(classId, req.body);
        if (!updatedClass) {
            (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, 'Class not found!', null);
        }
        else {
            (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Class updated successfully!', updatedClass);
        }
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.updateClass = updateClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = req.params.classId;
        const deletedClass = yield class_service_1.default.deleteClass(classId);
        if (!deletedClass) {
            (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, 'Class not found!', null);
        }
        else {
            (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Class deleted successfully!', deletedClass);
        }
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.deleteClass = deleteClass;
