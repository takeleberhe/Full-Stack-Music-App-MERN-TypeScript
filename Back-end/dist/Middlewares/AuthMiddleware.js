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
require("dotenv").config();
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
/* Step one :Authentication */
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.headers.cookie;
    const token = cookies === null || cookies === void 0 ? void 0 : cookies.split("=")[1];
    if (!token) {
        return res.status(400).json({ message: "token not found!" });
    }
    const secret = process.env.JWT_VERIFY_KEY || "";
    console.log(secret);
    return jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(400).json({ message: " invalid token " });
        }
        req.user = user;
        next();
    });
});
/* Authorization for normal user and admin */
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* acceshe token) by previous object! */
    verifyToken(req, res, () => {
        var _a, _b;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
            next();
        }
        else {
            res.send("you are not authorized!");
        }
    });
});
/* Authorization only for Admin */
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    verifyToken(req, res, () => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin") {
            next();
        }
        else {
            res.send("you are not authorized!");
        }
    });
});
module.exports = {
    verifyToken,
    isAuth,
    isAdmin,
};
