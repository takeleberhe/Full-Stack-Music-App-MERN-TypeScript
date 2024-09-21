import { Request, Response } from "express";
import Album from "../Model/Album";
import path from "path";
interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Create Album Controller
export const addAlbumController = async (req: MulterRequest, res: Response) => {
  try {
    const { title, artist } = req.body;
    const image = req.files?.["image"]?.[0];
    if (!image) {
      return res.status(400).json({ message: "image file is required" });
    }
    if (!title || !artist||!image) {
      res.send(" All Files are Required!!!");
    }
    const imagePath=image.path;
    const newAlbum = new Album({
      title,
      artist,
      image:imagePath
    });
    // save Album to database
    await newAlbum.save();
    return res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// getAllAlbums
export const getAlbumController = async (req: Request, res: Response) => {
  try {
    const albums = await Album.find().populate("songs");
    const albumsWithSongCount = albums.map((album) => ({
      _id: album._id,
      title: album.title,
      artist: album.artist,
      songCount: album.songs.length,
      image:album.image
    }));
    return res.json(albumsWithSongCount);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

/* Get Album Detail Controller */
export const getAlbumDetailController = async (req: Request, res: Response) => {
  let albumId = req.params.id;
  let album;
  try {
    album = await Album.findById(albumId);
    if (!album) {
      res.status(500).json({ message: "album not found" });
    }
    return res.status(201).json(album);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update Album Controller
export const updateAlbumController = async (
  req: MulterRequest,
  res: Response
) => {
  const { title, artist } = req.body;
  let albumId = req.params.id;
  let album;
  try {
    album = await Album.findByIdAndUpdate(albumId, {
      title,
      artist,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!album) {
    return res.status(404).json({ message: "you can't update this category" });
  }
  return res.status(200).json({ album });
};

//delete Album Controller
export const deleteAlbumController = async (
  req: MulterRequest,
  res: Response
) => {
  const id = req.params.id;
  let album;
  try {
    album = await Album.findByIdAndDelete(id).populate("user");
  } catch (error) {
    return console.log(error);
  }
  return res.status(200).json({ message: "song deleted successfully" });
};
