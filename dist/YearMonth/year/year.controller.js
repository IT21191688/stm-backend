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
exports.addYearIfNotExists = void 0;
const year_service_1 = __importDefault(require("./year.service"));
const addYearIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentYear = new Date().getFullYear();
        const yearExists = yield year_service_1.default.checkYearExists(currentYear);
        if (!yearExists) {
            const newYear = yield year_service_1.default.createYear(currentYear);
            return newYear; // Return the created year data
        }
        return null; // Indicate that the year already exists
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.addYearIfNotExists = addYearIfNotExists;
