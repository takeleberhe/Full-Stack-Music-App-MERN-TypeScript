import { Router, RequestHandler } from "express";
import {
  addSong,
  getAllSongs,
  getSongById,
  deleteSong,
  updateSong,
} from "../Controllers/Song-Controller";
import upload from "../Middlewares/uploadMiddleware";
const songRouter = Router();
// route api
songRouter.get("/songs", getAllSongs);
songRouter.get("/song/:id", getSongById);
songRouter.post(
  "/songs",
  upload.fields([{ name: "video", maxCount: 1 }]),
  addSong as RequestHandler
);
songRouter.patch("/song/:id", updateSong);
songRouter.delete("/song/:id", deleteSong);

export default songRouter;
