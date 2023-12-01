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
exports.scheduledMonth = exports.scheduledYear = void 0;
// cronJob.js
const node_cron_1 = __importDefault(require("node-cron"));
const year_controller_1 = require("../YearMonth/year/year.controller");
const months_service_1 = __importDefault(require("../YearMonth/month/months.service"));
const year_service_1 = __importDefault(require("../YearMonth/year/year.service"));
const scheduledMonth = () => {
    node_cron_1.default.schedule('0 0 1 * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            const currentYear = new Date().getFullYear();
            const yearId = yield year_service_1.default.getYearId(currentYear); // Assuming you have a service method to get year ID
            const newMonth = yield months_service_1.default.createMonth(currentMonth, yearId);
            console.log(`Added month ${currentMonth} for year ${currentYear}`);
        }
        catch (error) {
            console.error('Error in month creation:', error);
        }
    }));
};
exports.scheduledMonth = scheduledMonth;
// Schedule the job to run at the beginning of each year (January 1st at 00:00)
const scheduledYear = () => {
    node_cron_1.default.schedule('0 0 1 1 *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdYear = yield (0, year_controller_1.addYearIfNotExists)();
            if (createdYear) {
                console.log('Year created:', createdYear);
            }
            else {
                console.log('Current year already exists in the database.');
            }
        }
        catch (error) {
            console.error('Error in year check and add operation:', error);
        }
    }));
};
exports.scheduledYear = scheduledYear;
