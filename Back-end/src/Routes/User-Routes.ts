import express from "express";
import { signup, login } from "../Controllers/User-Controller";
   // user validation middlewares
import { validateData } from "../Middlewares/validationMiddleware";
import { userRegistrationSchema,userLoginSchema } from "../Schemas/userSchema";
const userRouter = express.Router();
// route api
userRouter.post("/register",validateData(userRegistrationSchema), signup);
userRouter.post("/login",validateData(userLoginSchema), login);

export default userRouter;
