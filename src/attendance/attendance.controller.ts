import { Request, Response } from 'express';
import * as attendanceService from '../attendance/attendance.service';
import CustomResponse from '../util/response';
import { StatusCodes } from 'http-status-codes';

const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendanceData = req.body;
    const attendance = await attendanceService.createAttendance(attendanceData);
    return CustomResponse(res, true, StatusCodes.CREATED, 'Attendance created successfully', attendance);
  } catch (error: any) {
    return CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attendanceData = req.body;
    const updatedAttendance = await attendanceService.updateAttendance(id, attendanceData);
    return CustomResponse(res, true, StatusCodes.OK, 'Attendance updated successfully', updatedAttendance);
  } catch (error: any) {
    return CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getAttendanceByStudentClassAndMonth = async (req: Request, res: Response) => {
  try {
    const { studentId, classId, month, year } = req.params;
    const attendance = await attendanceService.getAttendanceByStudentClassAndMonth(studentId, classId, month, year);
    return CustomResponse(res, true, StatusCodes.OK, 'Attendance retrieved successfully', attendance);
  } catch (error: any) {
    return CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};



export {
  createAttendance,
  updateAttendance,
  getAttendanceByStudentClassAndMonth
};
