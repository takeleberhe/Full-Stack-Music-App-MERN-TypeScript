import express from "express";
import { signup, login } from "../Controllers/User-Controller";
const userRouter = express.Router();
// route api
userRouter.post("/register", signup);
userRouter.post("/login", login);

export default userRouter;
