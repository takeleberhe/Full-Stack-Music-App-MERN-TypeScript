import express from "express";
import { RequestHandler } from "express";
import {
  addAlbumController,
  getAlbumController,
  getAlbumDetailController,
} from "../Controllers/Album-Controller";
import upload from "../Middlewares/uploadMiddleware";
const albumRouter = express.Router();
// route api
albumRouter.post(
  "/albums",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addAlbumController as RequestHandler
);
albumRouter.get("/albums", getAlbumController);
albumRouter.put("/album/:id");
albumRouter.get("/album/:id", getAlbumDetailController);
albumRouter.delete("/album/:id");

export default albumRouter;
