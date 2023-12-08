import { Request, Response } from 'express';
import attendanceService from '../attendance/attendance.service';
import CustomResponse from '../util/response';
import { StatusCodes } from 'http-status-codes';


const createAttendance = async (req: Request, res: Response) => {
  try {

    const attendanceData = req.body;

    const existingAttendance = await attendanceService.checkAttendanceExists(attendanceData.studentId, attendanceData.classId, attendanceData.month, attendanceData.year);

    console.log(attendanceData.studentId)
    if(!existingAttendance){


        const attendance = await attendanceService.createAttendance(attendanceData);
        return CustomResponse(res, true, StatusCodes.CREATED, 'Attendance created successfully', attendance);

    }else{
        console.log("exist")
    }
    
  } catch (error: any) {
    return CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};




const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newDate } = req.body; // Assuming 'date' is the array you want to update
    const updatedAttendance = await attendanceService.addDateToAttendance(id, newDate);
    return CustomResponse(res, true, StatusCodes.OK, 'Attendance date updated successfully', updatedAttendance);
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


const getClassDetailsWithAttendance=async(req:Request,res:Response)=>{

  try {
      const { studentId,month,year } = req.params;

      const assignedClasses:any = await attendanceService.fetchAssignedClasses(studentId,month,year);

      console.log(assignedClasses);
      return CustomResponse(res, true, StatusCodes.OK, 'Attendance retrieved successfully', assignedClasses);
      //console.log(assignedClasses);
  }catch(error:any){


    return CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);

  }
}



export {
  createAttendance,
  updateAttendance,
  getAttendanceByStudentClassAndMonth,
  getClassDetailsWithAttendance
};
