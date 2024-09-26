import mongoose, { Schema, Document, Types } from 'mongoose';

interface ISong extends Document {
  title: string;
  artist: string;
  genre: string;
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
    video: { type: String, required: false },
    album: { type: Types.ObjectId, ref: 'Album', required: false },
  },
  { timestamps: true }
);

const Song = mongoose.model<ISong>('Song', SongSchema);
export default Song;
