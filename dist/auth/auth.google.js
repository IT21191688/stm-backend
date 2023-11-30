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
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config = require("../config");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const googleAuth = (passport) => {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL,
    }, function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObject = {
                googleid: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                role: 'user',
            };
            console.log(userObject);
            try {
                const user = yield auth_model_1.default.findOne({ googleid: profile.id });
                if (user) {
                    return cb(null, user);
                }
                yield auth_model_1.default.create(userObject);
                return cb(null, user);
            }
            catch (err) {
                return cb(err.message);
            }
        });
    }));
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function (id, cb) {
        auth_model_1.default.findById(id, function (err, user) {
            cb(err, user);
        });
    });
};
exports.default = googleAuth;
