"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const class_controller_1 = require("./class.controller");
const ClassRouter = (0, express_1.Router)();
// Routes for class operations
ClassRouter.post("/classCreate", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), class_controller_1.createClass);
ClassRouter.get("/getClassDetails/:classId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), class_controller_1.getClassById);
ClassRouter.patch("/update/:classId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), class_controller_1.updateClass);
ClassRouter.patch("/delete/:classId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), class_controller_1.deleteClass);
ClassRouter.get("/getAllClassdetails", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), class_controller_1.getAllClasses);
exports.default = ClassRouter;
