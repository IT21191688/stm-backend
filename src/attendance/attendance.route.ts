// attendance.routes.js

import express from 'express';
import { createAttendance,updateAttendance,getAttendanceByStudentClassAndMonth,getClassDetailsWithAttendance } from './attendance.controller'; 
import authMiddleware from '../auth/auth.middleware';
import constants from '../constant';

import { Router } from 'express';

const attendanceRouter = Router();

attendanceRouter.post('/createAttendance',
authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
 createAttendance);


attendanceRouter.patch('/updateAttendance/:id',   
authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
updateAttendance);


attendanceRouter.get(
   '/getAttendance/:studentId/:classId/:month/:year',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getAttendanceByStudentClassAndMonth
);


attendanceRouter.get(
   '/getAttendancewithAssignClasses/:studentId/:month/:year',
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  getClassDetailsWithAttendance
);


export default attendanceRouter;
