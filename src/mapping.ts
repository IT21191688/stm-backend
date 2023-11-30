import UserRouter from "./user/user.route";
import constants from "./constant";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  
};

export default requestMappings;
