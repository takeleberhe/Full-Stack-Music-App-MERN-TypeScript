"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../Controllers/User-Controller");
const userRouter = express_1.default.Router();
// route api
userRouter.post("/register", User_Controller_1.signup);
userRouter.post("/login", User_Controller_1.login);
userRouter.get("/users", User_Controller_1.getAllusers);
userRouter.get("/users/:id", User_Controller_1.getuser);
userRouter.delete("/users/:id", User_Controller_1.deleteUser);
userRouter.patch("/users/:id", User_Controller_1.updateUser);
userRouter.post("/userprofile", User_Controller_1.updateUserProfile);
userRouter.get("/userprofile", User_Controller_1.getUserProfile);
userRouter.get("/refreshtoken", User_Controller_1.refreshToken);
exports.default = userRouter;
