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
exports.getAllPaymentsByStudentAndYear = exports.deletePayment = exports.updatePayment = exports.getPaymentById = exports.createPayment = void 0;
const http_status_codes_1 = require("http-status-codes");
const payment_service_1 = __importDefault(require("../payment/payment.service"));
const response_1 = __importDefault(require("../util/response"));
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        const newPayment = yield payment_service_1.default.createPayment(paymentData);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, 'Payment created successfully!', newPayment);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.createPayment = createPayment;
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const payment = yield payment_service_1.default.getPaymentById(paymentId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Payment details retrieved successfully!', payment);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getPaymentById = getPaymentById;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const updatedPaymentData = req.body;
        const updatedPayment = yield payment_service_1.default.updatePayment(paymentId, updatedPaymentData);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Payment updated successfully!', updatedPayment);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const deletedPayment = yield payment_service_1.default.deletePayment(paymentId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Payment deleted successfully!', deletedPayment);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.deletePayment = deletePayment;
const getAllPaymentsByStudentAndYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const { year } = req.query;
        const payments = yield payment_service_1.default.findAllPaymentsByStudentAndYear(studentId, year);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, 'Payments retrieved successfully!', payments);
    }
    catch (error) {
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    }
});
exports.getAllPaymentsByStudentAndYear = getAllPaymentsByStudentAndYear;
