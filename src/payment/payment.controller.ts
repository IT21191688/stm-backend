import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import paymentService from '../payment/payment.service';
import CustomResponse from '../util/response';

const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentService.createPayment(paymentData);
    CustomResponse(res, true, StatusCodes.CREATED, 'Payment created successfully!', newPayment);
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentService.getPaymentById(paymentId);
    CustomResponse(res, true, StatusCodes.OK, 'Payment details retrieved successfully!', payment);
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const updatePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const updatedPaymentData = req.body;
    const updatedPayment = await paymentService.updatePayment(paymentId, updatedPaymentData);
    CustomResponse(res, true, StatusCodes.OK, 'Payment updated successfully!', updatedPayment);
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deletePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const deletedPayment = await paymentService.deletePayment(paymentId);
    CustomResponse(res, true, StatusCodes.OK, 'Payment deleted successfully!', deletedPayment);
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getAllPaymentsByStudentAndYear = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    //const { year, month } = req.query; // Extract month from query parameters

    const { filter } = req.query;

if (typeof filter === 'string') {
  try {
    const { year, month } = JSON.parse(filter);
    // Now you have `year` and `month` as separate variables containing the values from the JSON object

      console.log(year,month);

    const payments = await paymentService.findAllPaymentsByStudentAndYear(studentId, year, month);

    //console.log(payments)

    CustomResponse(res, true, StatusCodes.OK, 'Payments retrieved successfully!', payments);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Handle JSON parsing error
  }
} else {
  // Handle cases where filter is not a string or undefined

  console.log("type not String")
}
  
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getPaymentUsingClass = async (req: Request, res: Response) => {
  try {
    const { studentId,classId } = req.params;
    //const { year, month } = req.query; // Extract month from query parameters

    const { filter } = req.query;

if (typeof filter === 'string') {
  try {
    const { year, month } = JSON.parse(filter);
    // Now you have `year` and `month` as separate variables containing the values from the JSON object

      console.log(year,month);

    const payments = await paymentService.findExistPaymentsByStudentAndYear(studentId, year, month,classId);

    //console.log(payments)

    CustomResponse(res, true, StatusCodes.OK, 'Payments retrieved successfully!', payments);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Handle JSON parsing error
  }
} else {
  // Handle cases where filter is not a string or undefined

  console.log("type not String")
}
  
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};


export{
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllPaymentsByStudentAndYear,
  getPaymentUsingClass
};
