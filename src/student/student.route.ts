import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { CreateStudent,GetStudentDetails,UpdateStudentDetails ,DeleteStudentDeteils} from "./student.controller";
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



StudentRouter.patch(
  "/update/:studentId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateStudentDetails
);

StudentRouter.patch(
  "/delete/:studentId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteStudentDeteils
);

export default StudentRouter;