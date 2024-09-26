import { Router, RequestHandler } from "express";
import {
  addSong,
  getAllSongs,
  getSongById,
  deleteSong,
  updateSong,
  getAllArtists,
  numberOfSongsPerGenre,
  totalController,
  getAllGenres
} from "../Controllers/Song-Controller";
import upload from "../Middlewares/uploadMiddleware";
import { validateData } from "../Middlewares/validationMiddleware";
import { SongSchema } from "../Schemas/songSchema";
const songRouter = Router();
// route api
songRouter.get("/songs", getAllSongs);
songRouter.get("/song/:id", getSongById);
songRouter.post(
  "/songs",
  upload.fields([{ name: "video", maxCount: 1 }]),
  validateData(SongSchema),
  addSong as RequestHandler
);
songRouter.patch("/song/:id", updateSong);
songRouter.get("/artists", getAllArtists);
songRouter.get("/songs/genre",numberOfSongsPerGenre);
songRouter.get("/total",totalController);
songRouter.get("/genres",getAllGenres);
songRouter.delete("/song/:id", deleteSong);

export default songRouter;
