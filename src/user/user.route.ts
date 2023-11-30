import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { RegisterUser } from "./user.controller";
import constants from "../constant";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

export default UserRouter;