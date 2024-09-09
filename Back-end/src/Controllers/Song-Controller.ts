import mongoose from "mongoose";
import Song from "../Model/Songs";
import Album from "../Model/Album";
import { Request, Response, RequestHandler } from "express";
import path from "path";

interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}
//add song controller which updates both song and album collection
export const addSong = async (
  req: MulterRequest,
  res: Response
): Promise<Response> => {
  try {
    const { title, artist, genre, albumId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(albumId)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }
    const video = req.files?.["video"]?.[0];
    if (!video) {
      return res.status(400).json({ message: "Video file is required" });
    }
    const videoPath = video.path;
    const newSong = new Song({
      title,
      artist,
      genre,
      video: videoPath,
      album: albumId,
    });
    // Save the song to the song collection
    await newSong.save();

    // Save the songId to the album collection
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    album.songs.push(newSong._id as mongoose.Types.ObjectId);
    await album.save();
    return res.status(201).json(newSong);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};
/*get All Songs*/
export const getAllSongs = async (req: Request, res: Response) => {
  let allSongs;
  try {
    allSongs = await Song.find().populate("album");
  } catch (error) {
    console.log(error);
  }
  if (!allSongs) {
    return res.status(404).json({ message: "song not found" });
  }
  return res.status(200).json({ allSongs });
};
/* get single song by id */
export const getSongById = async (req: Request, res: Response) => {
  let id = req.params.id;
  let song;
  try {
    song = await Song.findById(id).populate("album");
  } catch (error) {
    return console.log(error);
  }
  if (!song) {
    return res.status(400).json({ message: "song not found" });
  }
  return res.status(200).json({ song });
};
/* Delete song */
export const deleteSong = async (req: Request, res: Response) => {
  const id = req.params.id;
  let song;
  try {
    song = await Song.findByIdAndDelete(id).populate("user");
  } catch (error) {
    return console.log(error);
  }
  return res.status(200).json({ message: "song deleted successfully" });
};
// new update song
export const updateSong = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, artist, genre } = req.body;
  const songId = req.params.id;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(songId)) {
    return res.status(400).json({ message: "Invalid song ID format" });
  }
  let song;
  try {
    song = await Song.findByIdAndUpdate(
      songId,
      {
        title,
        artist,
        genre,
      },
      { new: true } // { new: true } returns the updated document
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the song" });
  }
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  return res.status(200).json({ song });
};
