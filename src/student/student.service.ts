// student.service.ts

import Student from '../student/student.model';
import qrcode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const findByEmail = async (email: string) => {
  return await Student.findOne({ email: email });
};

const save = async (studentData: any) => {
  try {
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();
    return savedStudent;
  } catch (error) {
    console.error('Error saving student:', error);
    throw error;
  }
};

const findById = async (id: string) => {
  return await Student.findById(id);
};

const generateQRCode = async (studentId: any): Promise<string> => {
  try {
    const studentIdString = studentId.toString(); // Convert ObjectId to string
    const qrCodeDataURL = await qrcode.toDataURL(studentIdString);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

const uploadQRImageToCloudinary = async (studentId: any, qrImageURL: any) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(qrImageURL.toString(), {
      public_id: `qr_${studentId}`,
      folder: 'student_qr_codes',
    });

    await Student.findByIdAndUpdate(studentId, { qrUrl: cloudinaryResponse.secure_url });

    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error('Error uploading QR image to Cloudinary:', error);
    throw error;
  }
};

export default {
  findByEmail,
  save,
  findById,
  generateQRCode,
  uploadQRImageToCloudinary,
};
