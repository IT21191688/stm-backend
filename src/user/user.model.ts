import mongoose from "mongoose";
import constants from "../constant";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Full name is required"],
      maxlength: [100, "Full name cannot be more than 50 characters"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      maxlength: [100, "last name cannot be more than 50 characters"],
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
    password:{
      type: String,
      required: [true, "Password is required"],

    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: [constants.USER.ROLES.ADMIN, constants.USER.ROLES.USER],
        message: "Valid roles required",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
