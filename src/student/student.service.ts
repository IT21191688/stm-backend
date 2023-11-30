import Student from '../student/student.model';
import nodemailer from 'nodemailer';
import emailService from '../util/email-templates/email.templates'
import qrcode from 'qrcode';



const findByEmail = async (email: string) => {
  return await Student.findOne({ email: email });
};

const save = async (student: any, session: any) => {
  if (session) {
    return await student.save({ session });
  } else {
    return await student.save();
  }
};

const findById = async (id: string) => {
  return await Student.findById(id).populate('classes');
};

const generateQRCode=async(data: string): Promise<string>=> {
  try {
    // Generate QR code as a data URL
    const qrCodeDataURL = await qrcode.toDataURL(data);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export default {
  findByEmail,
  save,
  findById,
  generateQRCode
};
