"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const student_controller_1 = require("./student.controller");
const constant_1 = __importDefault(require("../constant"));
//import authMiddleware from "../auth/auth.middleware";
const StudentRouter = (0, express_1.Router)();
StudentRouter.post("/sturegister", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), student_controller_1.CreateStudent);
exports.default = StudentRouter;
