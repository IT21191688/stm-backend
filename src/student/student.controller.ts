import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomResponse from '../util/response';
import studentService from '../student/student.service';
import userService from '../user/user.service';
import constants from '../constant';
import NotFoundError from '../error/error.classes/NotFoundError';
import nodemailer from 'nodemailer';
import emailService from '../util/email-templates/email.templates'
import { sendEmail } from "../util/emailServer";

const CreateStudent = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      age,
      grade,
      email,
      role,
      classes,
      payment,
    } = req.body;

    const auth: any = req.auth;
    const user = await userService.findById(auth._id);

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const studentData = {
      firstname,
      lastname,
      age,
      grade,
      email,
      role,
      classes,
      payment,
    };

    const createdStudent = await studentService.save(studentData,null);

 // Generate QR code for the student
    const qrCode = await studentService.generateQRCode(createdStudent.id); // Assuming generateQRCode function exists

    // Prepare email content
    const subject = 'Student QR Code';
    const htmlBody = emailService.StudentQRCodeEmail({ fullName: 'User', qrCode })

    // Send email to the student's email address
    await sendEmail(email, subject, htmlBody, null);


    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      'Student created successfully!',
      createdStudent
    );
  } catch (error) {
    console.error('Error creating student:', error);
  
  }
};

export default CreateStudent;
