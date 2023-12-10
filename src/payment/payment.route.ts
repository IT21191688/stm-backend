import { Router } from 'express';
import authMiddleware from '../auth/auth.middleware';
import constants from '../constant';
import {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllPaymentsByStudentAndYear,
  getPaymentUsingClass
} from './payment.controller';

const PaymentRouter = Router();

// Routes for payment operations
PaymentRouter.post(
  '/createPayment',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  createPayment
);

PaymentRouter.get(
  '/getPaymentById/:paymentId',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getPaymentById
);

PaymentRouter.patch(
  '/updatePayment/:paymentId',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  updatePayment
);

PaymentRouter.patch(
  '/deletePayment/:paymentId',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  deletePayment
);

PaymentRouter.get(
  '/getPaymentsByStudentAndYear/:studentId',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getAllPaymentsByStudentAndYear
);

PaymentRouter.get(
  '/getPaymentUsingClass/:studentId/:classId',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getPaymentUsingClass
);

export default PaymentRouter;
