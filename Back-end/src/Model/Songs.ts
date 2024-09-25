import mongoose, { Schema, Document, Types } from 'mongoose';
import { z } from 'zod';

interface ISong extends Document {
  title: string;
  artist: string;
  genre: string;
  image: string;
  audio: string;
  video: string;
  album: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String },
    audio: { type: String },
    video: { type: String, required: true },
    album: { type: Types.ObjectId, ref: 'Album', required: true },
  },
  { timestamps: true }
);

const Song = mongoose.model<ISong>('Song', SongSchema);
export default Song;
