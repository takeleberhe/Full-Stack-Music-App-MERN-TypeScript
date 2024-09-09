"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* import mongoose, { Schema, Document, Mongoose } from 'mongoose';
interface ISong extends Document {
  artistname:string;
  image:string;
  audio:string;
  songname:string;
  album:mongoose.Types.ObjectId;
  language:string;
  createdAt: Date; // Date of song creation
  updatedAt: Date; // Date of song last update
}
const songSchema = new Schema<ISong>({
  artistname: { type:String , required: true },
  songname:{type:String},
  image:{type:String},
  audio:{type:String},
  album:{ type: Schema.Types.ObjectId, ref: 'Album' },
  language:{type:String},
  createdAt: Date,  // Date of song document creation,
  updatedAt: Date   // Date of song document last update
});

export const Song = mongoose.model<ISong>('Song', songSchema);
export default Song; */
const mongoose_1 = __importStar(require("mongoose"));
const SongSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: true },
    audio: { type: String, required: true },
});
const Song = mongoose_1.default.model('Song', SongSchema);
exports.default = Song;
