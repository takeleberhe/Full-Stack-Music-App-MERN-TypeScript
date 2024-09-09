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
exports.getUserProfile = exports.updateUserProfile = exports.refreshToken = exports.updateUser = exports.deleteUser = exports.getAllusers = exports.getuser = exports.login = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../Model/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* load environment varibales here from .env file */
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    let existingUser;
    try {
        existingUser = yield User_1.User.findOne({ email: email });
    }
    catch (err) {
        console.log(err);
    }
    if (existingUser) {
        res
            .status(400)
            .json({ message: "the user already existes! login instead" });
    }
    /*hashing making our password secure which can't huckers can't decrypt it it is one way hashing can't be decrypted*/
    const hashpassword = bcryptjs_1.default.hashSync(password);
    /* create a new user which instance of the user */
    const user = new User_1.User({
        name,
        email,
        password: hashpassword,
        role,
    });
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err.message);
    }
    return res.status(201).json({ message: user });
});
exports.signup = signup;
/* Sign up */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_VERIFY_KEY || "";
    const { email, password } = req.body;
    let existingUser;
    if (!email && !password) {
        res.send("pleace fill the credentials!");
    }
    try {
        existingUser = yield User_1.User.findOne({ email: email });
        if (!existingUser || !existingUser.password) {
            return res
                .status(400)
                .json({ message: "user not found!pleace signup first!" });
        }
        const ispasswordCorrect = bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!ispasswordCorrect) {
            return res
                .status(400)
                .json({ message: "invalid credentail try again pleace!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, secret, {
            expiresIn: "1000s",
        });
        /* send user and token to the user! */
        res.cookie(String(existingUser._id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 1000),
            httpOnly: true,
            sameSite: "lax",
        });
        return res
            .status(200)
            .json({ message: "successfully Logged in", user: existingUser, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extracted user from the incomming JWT Token or get userId from the url directlly and accept it using "req.params.id"
    let user;
    let id = req.params.id;
    //const userid = req.user.id;
    user = yield User_1.User.findById(id);
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
});
exports.getuser = getuser;
/*get All users*/
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin") {
        try {
            const allUsers = yield User_1.User.find();
            res.status(200).json(allUsers);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    else {
        res.status(403).json("you are not authorized!");
    }
});
exports.getAllusers = getAllusers;
/* Delete user */
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = req.params.id;
    let user;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === req.params.id || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
        user = yield User_1.User.findByIdAndDelete(id);
        res.status(200).json("user has been deleted successfully");
    }
    else {
        res.status(403).json("you are not allowed to delete this user!");
    }
});
exports.deleteUser = deleteUser;
/* update user */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, email, password } = req.body;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === req.params.id || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
        let user = yield User_1.User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
        }, {
            new: true,
        });
        res.status(200).json({ user });
    }
});
exports.updateUser = updateUser;
/* refresh token to re-generate a token  */
const refreshToken = (req, res, next) => {
    const secret = process.env.JWT_VERIFY_KEY || "";
    const cookies = req.headers.cookie;
    const oldToken = cookies === null || cookies === void 0 ? void 0 : cookies.split("=")[1];
    console.log(oldToken);
    // Verify token
    if (!oldToken) {
        return res.status(400).json({ message: "Token couldn't be found!" });
    }
    jsonwebtoken_1.default.verify(String(oldToken), secret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed!" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, {
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
exports.refreshToken = refreshToken;
/* update user profile */
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let user = yield User_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = yield user.save();
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
        });
    }
    else {
        res.status(404).json("user not found");
    }
});
exports.updateUserProfile = updateUserProfile;
/* Get User Profile */
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // extracted user from Previous middleware
    let user;
    //console.log(req.user.id);
    user = yield User_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
});
exports.getUserProfile = getUserProfile;
