import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { User } from "../Model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/* load environment varibales here from .env file */
dotenv.config();

interface AuthRequest extends Request {
  id?: string;
  user?: {
    id: string;
    role: "user" | "admin";
    name: "name";
    email: "email";
    image: "image";
  };
}
// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  password?: string;
}

interface CustomRequest extends Request {
  user?: IUser;
}
//Sing Up Controller
export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    res.status(400).json({ message: "user already exist! login instead" });
  }
  /*one way hashing for securing password which can't be decrypted*/
  const hashpassword = bcrypt.hashSync(password);
  /* create a new user which instance of the user */
  const user = new User({
    name,
    email,
    password: hashpassword,
    role,
  });
  try {
    await user.save();
  } catch (err: any) {
    console.log(err.message);
  }
  return res.status(201).json({ message: user });
};
/* Sign In controller */
export const login = async (req: AuthRequest, res: Response) => {
  const secret = process.env.JWT_VERIFY_KEY || "";
  const { email, password } = req.body;
  let existingUser;
  if (!email && !password) {
    res.send("pleace fill the credentials!");
  }
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser || !existingUser.password) {
      return res
        .status(400)
        .json({ message: "user not found!pleace signup first!" });
    }
    const ispasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!ispasswordCorrect) {
      return res
        .status(400)
        .json({ message: "invalid credentail try again pleace!" });
    }
    const token = jwt.sign({ id: existingUser._id }, secret, {
      expiresIn: "1000s",
    });
    /* send user and token to client(browser)! */
    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 1000),
      httpOnly: true,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "successfully Logged in", user: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};
/* refresh token to re-generate a token  */
export const refreshToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_VERIFY_KEY || "";
  const cookies = req.headers.cookie;
  const oldToken = cookies?.split("=")[1];
  console.log(oldToken);
  // Verify token
  if (!oldToken) {
    return res.status(400).json({ message: "Token couldn't be found!" });
  }
  jwt.verify(String(oldToken), secret, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed!" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "30s",
    });
    console.log("Regenerated Token\n", token);
    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 20),
      httpOnly: true,
      sameSite: "lax",
    });
    req.id = user.id;
    next();
  });
};
