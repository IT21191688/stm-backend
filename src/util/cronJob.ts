
import cron from 'node-cron';
import mongoose from 'mongoose';
import PaymentModel from '../payment/payment.model';
import StudentModel from '../student/student.model';
import ClassModel from '../class/class.model';

import paymentService from '../payment/payment.service';

import attendanceService from '../attendance/attendance.service'; 



const generatePayments = async () => {
  try {
    // Get all students
    const allStudents = await StudentModel.find().populate('classes');


    for (const student of allStudents) {
    
      const studentClassIds = student.classes.map((classRef) => classRef._id);

      
      for (const classId of studentClassIds) {
        // Find the class details by ID
        const classDetails = await ClassModel.findById(classId);

         //console.log(classDetails)

        if (classDetails) {
          const paymentData = {
            paymentId: new mongoose.Types.ObjectId(),
            studentId: student._id,
            paymentDate: new Date(), // Current date
            paymentMonth: new Date().toLocaleString('default', { month: 'long' }), 
            paymentYear: new Date().getFullYear().toString(), // 
            classId: classDetails._id,
            paymentType: student.payementType,
            paymentStatus:'Not Paid'
      
          };

          await paymentService.createPayment(paymentData);
        }
      }
    }

    console.log('Payments generated successfully for all students based on their classes.');
  } catch (error) {
    console.error('Error generating payments:', error);
    throw error;
  }
};



//every minite * * * * *
//1st day of month 0 0 1 * *
const scheduleAutomaticPayments = () => {
  cron.schedule('* * * * *', async () => {
    try {
      await generatePayments(); // Call the function for generating payments
    } catch (error) {
      console.error('Error in automatic payment generation:', error);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Colombo', 
  });
};


const createAttendanceForAllStudents = async () => {
  try {
  
     const allStudents = await StudentModel.find().populate('classes');
    
    allStudents.forEach(async (student) => {
      for (const classItem of student.classes) {
     

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();


        const attendanceData = {
          studentId: student._id,
          classId: classItem._id,
          month: month,
          year: year,

        };


        await attendanceService.createAttendance(attendanceData);

      }
    });

    console.log('Attendance created for all students in their classes.');
  } catch (error) {
    console.error('Error creating attendance:', error);
  }
};


const scheduleAutomaticAttendance = () => {
  cron.schedule('* * * * *', async () => {
    try {
      await createAttendanceForAllStudents(); // Call the function to create attendance
    } catch (error) {
      console.error('Error in automatic attendance creation:', error);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Colombo', 
  });
};






export{scheduleAutomaticPayments,scheduleAutomaticAttendance};
