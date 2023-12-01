"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const payment_controller_1 = require("./payment.controller");
const PaymentRouter = (0, express_1.Router)();
// Routes for payment operations
PaymentRouter.post('/createPayment', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), payment_controller_1.createPayment);
PaymentRouter.get('/getPaymentById/:paymentId', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), payment_controller_1.getPaymentById);
PaymentRouter.patch('/updatePayment/:paymentId', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), payment_controller_1.updatePayment);
PaymentRouter.patch('/deletePayment/:paymentId', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), payment_controller_1.deletePayment);
PaymentRouter.get('/getPaymentsByStudentAndYear/:studentId', auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), payment_controller_1.getAllPaymentsByStudentAndYear);
exports.default = PaymentRouter;
