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
const year_model_1 = __importDefault(require("./year.model"));
const checkYearExists = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const existingYear = yield year_model_1.default.findOne({ year });
    return !!existingYear;
});
const createYear = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const newYear = yield year_model_1.default.create({ year });
    return newYear;
});
const getYearId = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundYear = yield year_model_1.default.findOne({ year });
        if (foundYear) {
            return foundYear._id; // Return the ID of the found year
        }
        // If the year does not exist, you might handle it by creating the year here.
        // For example:
        const newYear = new year_model_1.default({ year });
        const savedYear = yield newYear.save();
        return savedYear._id;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = {
    checkYearExists,
    createYear,
    getYearId
};
