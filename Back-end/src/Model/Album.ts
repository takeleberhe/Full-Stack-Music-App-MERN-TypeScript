import mongoose, { Schema, Document } from "mongoose";

interface IAlbum extends Document {
  title: string;
  artist: string;
  songCount: number;
  songs: mongoose.Types.ObjectId[];
  image: string; // Added image field
  createdAt: Date;
  updatedAt: Date;
}

const AlbumSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    songCount: { type: Number },
    songs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
    image: { type: String, required: false }, // Added image field
  },
  { timestamps: true }
);

const Album = mongoose.model<IAlbum>("Album", AlbumSchema);
export default Album;
