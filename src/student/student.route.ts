import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { CreateStudent } from "./student.controller";
import constants from "../constant";
//import authMiddleware from "../auth/auth.middleware";

const StudentRouter = Router();

StudentRouter.post("/sturegister", authMiddleware.authorize([constants.USER.ROLES.ADMIN]),CreateStudent);

export default StudentRouter;