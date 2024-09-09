"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Song_controller_1 = require("../Controllers/Song-controller");
const uploadMiddleware_1 = __importDefault(require("../Middlewares/uploadMiddleware"));
/* const {
  verifyToken,
  isAdmin,
  isAuth,
} = require("../Middlewares/authMiddleware"); */
const songRouter = express_1.default.Router();
// route api
songRouter.get("/songs", Song_controller_1.getAllSongs);
songRouter.get("/song/:id", Song_controller_1.getSongById);
songRouter.post("/songs", uploadMiddleware_1.default.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), Song_controller_1.addSong);
songRouter.put("/song/:id", Song_controller_1.updateSong);
songRouter.delete("/song/:id", Song_controller_1.deleteSong);
songRouter.delete("/song/:id/songs", Song_controller_1.getSongByUserId);
exports.default = songRouter;
