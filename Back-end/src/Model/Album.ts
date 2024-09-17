import mongoose, { Schema, Document } from "mongoose";
interface IAlbum extends Document {
  title: string;
  artist: string;
  songCount: number;
  songs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
const AlbumSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    songCount: { type: Number },
    songs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);
const Album = mongoose.model<IAlbum>("Album", AlbumSchema);
export default Album;
