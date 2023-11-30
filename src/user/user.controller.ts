
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Auth from "../auth/auth.model";
import userUtill from "./user.utill";
import { startSession } from "mongoose";
import CustomResponse from "../util/response";

import User from "../user/user.model";
import userService from "../user/user.service";

// Import custom errors
import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";
import constants from "../constant";




const RegisterUser = async (req: Request, res: Response) => {
  const body: any = req.body;
  const user: any = new User(body.user);

  const existingUser = await userService.findByEmail(user.email);

  //console.log(user.email)


  if (existingUser) {
    throw new BadRequestError("User already exists!");
  }

  //console.log(body.user)


  //construct auth object
  const auth = new Auth();
  auth._id = user.email;
  auth.password = await userUtill.hashPassword(body.user.password);
  auth.user = user._id;

  let createdUser = null;

  //start mongoose session
  const session = await startSession();

  try {
    //start transaction in session
    session.startTransaction();

    //save user
    createdUser = await userService.save(user, session);

    //console.log(createdUser)

    //save auth
    await userService.save(auth, session);

    //commit transaction
    await session.commitTransaction();
  } catch (e) {
    //abort transaction
    await session.abortTransaction();
    throw e;
  } finally {
    //end session
    session.endSession();
  }

  return CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "User registered successfully!",
    createdUser
  );


}


export{
    RegisterUser
}