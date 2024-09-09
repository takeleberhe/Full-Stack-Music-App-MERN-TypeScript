"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlbumController = exports.updateAlbumController = exports.getAlbumController = exports.addAlbumController = void 0;
const Album_1 = __importDefault(require("../Model/Album")); // Adjust the path
// Create a new Album
const addAlbumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, artist } = req.body;
        const newAlbum = new Album_1.default({
            name,
            artist
        });
        // save Album to database
        yield newAlbum.save();
        res.status(201).json(newAlbum);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.addAlbumController = addAlbumController;
// read Album
const getAlbumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let album;
    try {
        album = yield Album_1.default.find();
        if (!album) {
            res.status(500).json({ message: "category not found" });
        }
        res.status(201).json(album);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAlbumController = getAlbumController;
//update Album Controller
const updateAlbumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, artist } = req.body;
    let albumId = req.params.id;
    let album;
    try {
        album = yield Album_1.default.findByIdAndUpdate(albumId, {
            title,
            artist
        });
    }
    catch (error) {
        return console.log(error);
    }
    if (!album) {
        return res.status(404).json({ message: "you can't update this category" });
    }
    return res.status(200).json({ album });
});
exports.updateAlbumController = updateAlbumController;
//delete Category Controller
const deleteAlbumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let album;
    try {
        album = yield Album_1.default.findByIdAndDelete(id).populate("user");
    }
    catch (error) {
        return console.log(error);
    }
    return res.status(200).json({ message: "song deleted successfully" });
});
exports.deleteAlbumController = deleteAlbumController;
