"use strict";
/*import schedule from "node-schedule";
import appointmentService from "../appointment/appointment.service";
import emailTemplates from "./email-templates/email.templates";
import userService from "../user/user.service";
import { sendEmail } from "./emailServer";
import { timeSlots } from "../appointment/appointment.util";

//cron job helper fun
export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

// 30 * * * * * => every 30 seconds
// 0 6 * * * => every day at 6 am

//send appointment reminders daily at 6 am
/*
const sendAppointmentReminders = () => {
  cronJob("* * * * *", async () => {
    console.log("Appointment reminder cron job running...");
    //get today's date
    const today = new Date();

    //get all appointments for today
    const appointments: any = await appointmentService.findByDateAndApproved(
      new Date(today.toISOString().split("T")[0])
    );

    appointments.forEach(async (appointment: any) => {
      let user: any = await userService.findById(appointment.addedBy);

      let data: any = {
        userName: user.fullName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: timeSlots.find((time: any) => {
          return time.id === appointment.appointmentTime;
        })?.timeSlot,
      };

      let htmlBody = emailTemplates.AppointmentReminderTemplate(data);

      await sendEmail(user.email, "Appointment Reminder", htmlBody, null);
    });
  });
};

export { sendAppointmentReminders };

*/
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
exports.scheduleAutomaticPayments = void 0;
// cronJob.js
const node_cron_1 = __importDefault(require("node-cron"));
//import { addYearIfNotExists } from '../YearMonth/year/year.controller';
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../student/student.model")); // Import your Student model
const class_model_1 = __importDefault(require("../class/class.model"));
const payment_service_1 = __importDefault(require("../payment/payment.service"));
/*
const scheduledMonth = () => {
  cron.schedule('0 0 1 * *', async () => {
    try {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
      const yearId = await yearService.getYearId(currentYear); // Assuming you have a service method to get year ID
      
      const newMonth = await monthService.createMonth(currentMonth, yearId);
      console.log(`Added month ${currentMonth} for year ${currentYear}`);
    } catch (error) {
      console.error('Error in month creation:', error);
    }
  });
};

// Schedule the job to run at the beginning of each year (January 1st at 00:00)
const scheduledYear = () => {
  cron.schedule('0 0 1 1 *', async () => {
    try {
      const createdYear = await addYearIfNotExists();

      if (createdYear) {
        console.log('Year created:', createdYear);
      } else {
        console.log('Current year already exists in the database.');
      }
    } catch (error) {
      console.error('Error in year check and add operation:', error);
    }
  });
};

*/
const generatePayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all students
        const allStudents = yield student_model_1.default.find().populate('classes'); // Assuming 'classes' field contains class references
        console.log(allStudents);
        // Loop through each student
        for (const student of allStudents) {
            // Get class IDs for the current student
            const studentClassIds = student.classes.map((classRef) => classRef._id);
            console.log(studentClassIds);
            // Fetch details for each class of the current student
            for (const classId of studentClassIds) {
                // Find the class details by ID
                const classDetails = yield class_model_1.default.findById(classId);
                console.log(classDetails);
                if (classDetails) {
                    // Create payment data for the current student in the current class for the current month
                    const paymentData = {
                        paymentId: new mongoose_1.default.Types.ObjectId(), // Generate unique payment ID
                        studentId: student._id,
                        paymentDate: new Date(), // Current date
                        paymentMonth: new Date().toLocaleString('default', { month: 'long' }), // Current month name
                        paymentYear: new Date().getFullYear().toString(), // Current year as string
                        classId: classDetails._id,
                        paymentType: student.payementType,
                        paymentStatus: 'Not Paid'
                        // Other necessary fields specific to your use case
                    };
                    console.log(paymentData);
                    // Create payment for the current student in the current class
                    yield payment_service_1.default.createPayment(paymentData);
                }
            }
        }
        console.log('Payments generated successfully for all students based on their classes.');
    }
    catch (error) {
        console.error('Error generating payments:', error);
        throw error;
    }
});
// Cron job to trigger the automatic payment generation function on the 1st day of every month
//every minite * * * * *
//1st day of month 0 0 1 * *
const scheduleAutomaticPayments = () => {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield generatePayments(); // Call the function for generating payments
        }
        catch (error) {
            console.error('Error in automatic payment generation:', error);
        }
    }), {
        scheduled: true,
        timezone: 'Asia/Colombo', // Replace 'YOUR_TIMEZONE' with your desired timezone (e.g., 'UTC', 'America/New_York', etc.)
    });
};
exports.scheduleAutomaticPayments = scheduleAutomaticPayments;
