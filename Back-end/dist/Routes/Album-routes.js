"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Album_1 = require("../Controllers/Album");
/* const {
  verifyToken,
  isAdmin,
  isAuth,
} = require("../Middlewares/authMiddleware"); */
const albumRouter = express_1.default.Router();
// route api
albumRouter.post("/album", Album_1.addAlbumController);
albumRouter.get("/album", Album_1.getAlbumController);
albumRouter.put("/album/:id", Album_1.updateAlbumController);
albumRouter.delete("/album/:id", Album_1.deleteAlbumController);
exports.default = albumRouter;
