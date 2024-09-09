"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/* UserSchema - Defines the schema for the User model in MongoDB.*/
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    role: {
        type: String
    },
    image: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
/**
 * UserModel - The Mongoose model for the User collection in MongoDB.
 * It uses the IUser interface to define the structure of user documents
 * and applies the UserSchema for validation and data storage.
 */
exports.UserModel = mongoose_1.default.model("User", UserSchema);
