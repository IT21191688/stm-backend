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


// cronJob.js

import cron from 'node-cron';
import { addYearIfNotExists } from '../YearMonth/year/year.controller';

import monthService from '../YearMonth/month/months.service';
import yearService from '../YearMonth/year/year.service';


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




export{scheduledYear,scheduledMonth};
