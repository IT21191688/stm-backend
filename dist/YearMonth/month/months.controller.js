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
const http_status_codes_1 = require("http-status-codes");
const months_service_1 = __importDefault(require("./months.service"));
const createMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, yearId } = req.body;
        const newMonth = yield months_service_1.default.createMonth(month, yearId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(newMonth);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});
// Other controller methods for fetching, updating, deleting months, if needed
exports.default = {
    createMonth,
};
