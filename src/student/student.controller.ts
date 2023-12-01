// student.controller.ts

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomResponse from '../util/response';
import studentService from '../student/student.service';
import userService from '../user/user.service';
import NotFoundError from '../error/error.classes/NotFoundError';
import { sendEmail } from '../util/emailServer';
import emailService from '../util/email-templates/email.templates';
import constants from '../constant';

const CreateStudent = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      age,
      grade,
      profileImage,
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
      profileImage,
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

const GetStudentDetails = async (req: Request, res: Response) => {
  try {
    const studentId: any = req.params.studentId;
    const auth: any = req.auth;


    //console.log(studentId)

    const student: any = await studentService.findById(studentId);

    if (!student) {
      throw new NotFoundError("Student not found!");
    }


    /*
    if (student.addedBy.toString() !== auth._id) {
      throw new ForbiddenError("You are not authorized to view this student!");
    }
  */
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Student details retrieved successfully!",
      student
    );
  } catch (e) {
    // Handle any errors that may occur during the process
    throw e;
  }
};



const UpdateStudentDetails = async (req: Request, res: Response) => {
  const studentId: any = req.params.studentId;
  const auth: any = req.auth;
  const body: any = req.body;

  const student: any = await studentService.findById(studentId);

  if (!student) throw new NotFoundError("Student not found!");

  //let today = new Date();

  //updating process
  for (let key in body) {
    if (key !== "addedBy") {
      student[key] = body[key];
    }
  }

  try {
    await studentService.save(student);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Student updated successfully!",
      student
    );
  } catch (e) {
    throw e;
  }
};

const DeleteStudentDeteils = async (req: Request, res: Response) => {
  const studentId: any = req.params.studentId;
  const auth: any = req.auth;

  const student: any = await studentService.findById(studentId);
  console.log(studentId)

  if (!student) throw new NotFoundError("Student not found!");

  student.status = constants.WELLKNOWNSTATUS.INACTIVE;

  try {
    await studentService.save(student);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Student deleted successfully!",
      null
    );
  } catch (e) {
    throw e;
  }
};







export { CreateStudent,GetStudentDetails,UpdateStudentDetails,DeleteStudentDeteils };
