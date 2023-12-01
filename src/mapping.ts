import UserRouter from "./user/user.route";
import AuthRouter from "./auth/auth.route";
import StudentRouter from "./student/student.route";
import ClassRouter from "./class/class.route";
import constants from "./constant";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
  app.use(constants.API.PREFIX.concat("/student"), StudentRouter);
  app.use(constants.API.PREFIX.concat("/class"), ClassRouter);
  
};

export default requestMappings;
