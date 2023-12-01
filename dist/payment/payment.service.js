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
const payment_model_1 = __importDefault(require("./payment.model"));
const createPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPayment = new payment_model_1.default(paymentData);
        const createdPayment = yield newPayment.save();
        return createdPayment;
    }
    catch (error) {
        throw error;
    }
});
const getPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield payment_model_1.default.findById(paymentId).populate('studentId classId paymentMonth paymentYear userId');
    }
    catch (error) {
        throw error;
    }
});
const updatePayment = (paymentId, updatedPaymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield payment_model_1.default.findByIdAndUpdate(paymentId, updatedPaymentData, { new: true });
    }
    catch (error) {
        throw error;
    }
});
const deletePayment = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield payment_model_1.default.findByIdAndDelete(paymentId);
    }
    catch (error) {
        throw error;
    }
});
const findAllPaymentsByStudentAndYear = (studentId, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_model_1.default.find({
            studentId,
            paymentYear: year, // Assuming paymentYear contains the ObjectId of the specific year
        }).populate('paymentMonth'); // Assuming you want to populate the paymentMonth field
        return payments;
    }
    catch (error) {
        console.error('Error retrieving payments:', error);
        throw error;
    }
});
exports.default = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    findAllPaymentsByStudentAndYear
};
