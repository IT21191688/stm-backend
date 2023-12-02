"use strict";
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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const InternalServerError_1 = __importDefault(require("../error/error.classes/InternalServerError"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
// Mail server configurations
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    // host: 'smtp.gmail.com',
    // port: 465,
    secure: true,
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD,
    },
});
const sendEmail = (email, subject, htmlBody, attachment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw new NotFoundError_1.default("Email is required!");
    if (!subject)
        throw new NotFoundError_1.default("Subject is required!");
    if (!htmlBody)
        throw new NotFoundError_1.default("HTML body is required!");
    const mailOptions = {
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
        const result = yield transporter.sendMail(mailOptions);
        //console.log("Email sent successfully:", result);
        return result;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new InternalServerError_1.default("Failed to send email");
    }
});
exports.sendEmail = sendEmail;
