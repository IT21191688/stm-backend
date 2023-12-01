import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";
import {
  createClass,
  getClassById,
  getAllClasses,
  deleteClass,
  updateClass
} from "./class.controller";

const ClassRouter = Router();

// Routes for class operations
ClassRouter.post(
  "/classCreate",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  createClass
);

ClassRouter.get(
  "/getClassDetails/:classId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getClassById
);

ClassRouter.patch(
  "/update/:classId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  updateClass
);

ClassRouter.patch(
  "/delete/:classId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  deleteClass
);

ClassRouter.get(
  "/getAllClassdetails",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getAllClasses
);


export default ClassRouter;
