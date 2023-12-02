
/*
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

console.log(oAuth2Client);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const sendEmail = async (email:String, subject:String, htmlBody:String, attachment:any) => {
  if (!email) throw new Error('Email is required!');
  if (!subject) throw new Error('Subject is required!');
  if (!htmlBody) throw new Error('HTML body is required!');

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    console.log(accessToken)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      html: htmlBody,
    };


    return await transporter.sendMail(mailOptions);
  } catch (error:any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export{ sendEmail };

*/

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import InternalServerError from "../error/error.classes/InternalServerError";
import NotFoundError from "../error/error.classes/NotFoundError";

// Mail server configurations
const transporter = nodemailer.createTransport({
  service: "Gmail",
  // host: 'smtp.gmail.com',
  // port: 465,
  secure: true,
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

const sendEmail = async (
  email: string,
  subject: string,
  htmlBody: string,
  attachment: any
) => {
  if (!email) throw new NotFoundError("Email is required!");
  if (!subject) throw new NotFoundError("Subject is required!");
  if (!htmlBody) throw new NotFoundError("HTML body is required!");

  const mailOptions: any = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: subject,
    html: htmlBody,
  };

  if (attachment) {
    mailOptions.attachments = [
      {
        filename: attachment.originalname,
        content: attachment.buffer,
        contentType: attachment.mimetype,
      },
    ];
  }

  try {
    const result = await transporter.sendMail(mailOptions);
    //console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new InternalServerError("Failed to send email");
  }
};

export { sendEmail };
