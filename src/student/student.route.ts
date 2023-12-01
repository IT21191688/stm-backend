import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { CreateStudent,GetStudentDetails } from "./student.controller";
import constants from "../constant";
//import authMiddleware from "../auth/auth.middleware";

const StudentRouter = Router();



StudentRouter.post(
    "/sturegister",
 authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
 CreateStudent);


StudentRouter.get(
  "/getStudentDetails/:studentId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetStudentDetails
);

export default StudentRouter;