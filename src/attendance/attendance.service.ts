// attendance.service.js

import Attendance from '../attendance/attendance.model';

// Function to create new attendance
const createAttendance = async (attendanceData:any) => {
  try {

      const existingAttendance = await checkAttendanceExists(
      attendanceData.studentId,
      attendanceData.classId,
      attendanceData.month,
      attendanceData.year
    );

    if(!existingAttendance){

        const newAttendance = await Attendance.create(attendanceData);
        return newAttendance;

    }else{
        console.log("Exist")
    }
    
  } catch (error) {
    throw new Error('Could not create attendance');
  }
};



const updateAttendance = async (id:String, attendanceData:any) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, attendanceData, { new: true });
    if (!updatedAttendance) {
      throw new Error('Attendance not found');
    }
    return updatedAttendance;
  } catch (error) {
    throw new Error('Could not update attendance');
  }
};


const getAttendanceByStudentClassAndMonth = async (studentId:String, classId:String, month:String, year:String) => {
  try {
    // Implement logic to fetch attendance by student, class, and month
    const attendance = await Attendance.find({
      studentId,
      classId,
      month,
      year,
    });

    return attendance;
  } catch (error) {
    throw new Error('Could not retrieve attendance');
  }
};

const checkAttendanceExists = async (studentId:String, classId:String, month:String, year:String) => {
  const existingAttendance = await Attendance.findOne({
    studentId: studentId,
    classId: classId,
    month: month,
    year: year,
  });
  return existingAttendance;
};


export default{
    createAttendance,
    updateAttendance,
    getAttendanceByStudentClassAndMonth,
    checkAttendanceExists
}