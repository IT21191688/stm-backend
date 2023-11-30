// student.controller.ts

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomResponse from '../util/response';
import studentService from '../student/student.service';
import userService from '../user/user.service';
import NotFoundError from '../error/error.classes/NotFoundError';
import { sendEmail } from '../util/emailServer';
import emailService from '../util/email-templates/email.templates';

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

    // Save the student details
    const createdStudent = await studentService.save(studentData);

    // Generate QR code for the student using the student ID
    const qrCodeDataURL = await studentService.generateQRCode(createdStudent._id);

    // Upload the QR code image to Cloudinary
    const cloudinaryURL = await studentService.uploadQRImageToCloudinary(
      createdStudent._id,
      qrCodeDataURL
    );

    // Prepare and send email content
    const subject = 'Student QR Code';
    const htmlBody = emailService.StudentQRCodeEmail({ fullName: 'User', qrCode: cloudinaryURL });

    // Send email to the student's email address
    await sendEmail(email, subject, htmlBody,null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      'Student created successfully!',
      createdStudent
    );
  } catch (error) {
    console.error('Error creating student:', error);
    // Handle the error or send an appropriate response
    // CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create student');
  }
};

export { CreateStudent };
