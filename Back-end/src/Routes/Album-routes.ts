import express, { RequestHandler } from "express";
import {
  addAlbumController,
  getAlbumController,
  getAlbumDetailController,
} from "../Controllers/Album-Controller";
import upload from "../Middlewares/uploadMiddleware";
import { validateData } from "../Middlewares/validationMiddleware";
import albumSchema from "../Schemas/albumSchema";
const albumRouter = express.Router();
// route api
albumRouter.post(
  "/albums",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateData(albumSchema),
  addAlbumController as RequestHandler
);
albumRouter.get("/albums", getAlbumController);
albumRouter.put("/album/:id");
albumRouter.get("/album/:id", getAlbumDetailController);
albumRouter.delete("/album/:id");

export default albumRouter;
