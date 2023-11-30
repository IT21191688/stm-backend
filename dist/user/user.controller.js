"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const user_utill_1 = __importDefault(require("./user.utill"));
const mongoose_1 = require("mongoose");
const response_1 = __importDefault(require("../util/response"));
const User = require('../user/user.model');
const userService = require('../user/user.service');
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = new User(body.user);
    const existingUser = yield userService.findByEmail(user.email);
    if (existingUser) {
        throw new BadRequestError_1.default("User already exists!");
    }
    //construct auth object
    const auth = new auth_model_1.default();
    auth._id = user.email;
    auth.password = yield user_utill_1.default.hashPassword(body.user.password);
    auth.user = user._id;
    let createdUser = null;
    //start mongoose session
    const session = yield (0, mongoose_1.startSession)();
    try {
        //start transaction in session
        session.startTransaction();
        //save user
        createdUser = yield userService.save(user, session);
        //save auth
        yield userService.save(auth, session);
        //commit transaction
        yield session.commitTransaction();
    }
    catch (e) {
        //abort transaction
        yield session.abortTransaction();
        throw e;
    }
    finally {
        //end session
        session.endSession();
    }
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "User registered successfully!", createdUser);
});
exports.RegisterUser = RegisterUser;
