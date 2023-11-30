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
const auth_model_1 = __importDefault(require("./auth.model"));
const config = require('../config');
const jwt = require('jsonwebtoken');
const googleauth = require('../auth/auth.middleware');
const save = (auth, session) => __awaiter(void 0, void 0, void 0, function* () {
    return yield auth.save({ session });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield auth_model_1.default.findById(id);
});
const googleLogin = (app, passport) => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), function (req, res) {
        const user = req.user;
        const token = jwt.sign({ userId: user._id }, config.secretKey);
        const role = user.role;
        res.send(`
        <script>
          window.opener.postMessage({ token: '${token}', role: '${role}' }, 'http://localhost:3000');
          window.close();
        </script>
      `);
    });
    app.get('/api/is-authenticated', googleauth.googleAuthenticate, (req, res) => {
        const user = req.user;
        const token = jwt.sign({ userId: user._id }, config.secretKey);
        const role = user.role;
        res.json({ token, role });
    });
});
// Usage:
// Ensure to pass 'app' and 'passport' as arguments when calling this function
//initializeGoogleAuthRoutes(app, passport);
exports.default = { save, findById, googleLogin };
