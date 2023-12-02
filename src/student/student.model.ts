import mongoose from "mongoose";
import constants from "../constant";

const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      maxlength: [100, "first name cannot be more than 50 characters"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      maxlength: [100, "last name cannot be more than 50 characters"],
    },
    age:{
        type:Number,
        required:[true,"Age is required"]
    },
    grade:{
        type:String,
        required:[true,"Grade is required"]

    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxlength: [100, "Email cannot be more than 100 characters"],
      validate: {
        validator: (value: string) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
        message: (props: any) => `${props.value} is not a valid email`,
      },
    },
    profileImage: {
      type: String,
      required:[false]
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: [constants.USER.ROLES.ADMIN, constants.USER.ROLES.USER],
        message: "Valid roles required",
      },
    },
    classes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        },
      ],
    },
    payement: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Payment",
        },
      ],
    },
    payementType: {
      type:String,
      required: [true, "payementType is required"],
    },
    qrUrl:{
        type:String,
          required: [false, "qrUrl is required"],
    },
    status: {
      type: Number,
      default: constants.WELLKNOWNSTATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Student", StudentSchema);
