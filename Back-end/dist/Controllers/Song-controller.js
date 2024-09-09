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
exports.getSongByUserId = exports.updateSong = exports.deleteSong = exports.getSongById = exports.getAllSongs = exports.addSong = void 0;
/* add all song controllers here */
const Songs_1 = __importDefault(require("../Model/Songs"));
/* Add Song */
const addSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { title, artist, genre } = req.body;
        const image = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b[0].path;
        const audio = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.audio) === null || _d === void 0 ? void 0 : _d[0].path;
        const newSong = new Songs_1.default({ title, artist, genre, image, audio });
        yield newSong.save();
        res.status(201).json(newSong);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addSong = addSong;
/*get All Songs*/
const getAllSongs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let allSongs;
    try {
        allSongs = yield Songs_1.default.find().populate("category");
    }
    catch (error) {
        console.log(error);
    }
    if (!allSongs) {
        return res.status(404).json({ message: "song not found" });
    }
    return res.status(200).json({ allSongs });
});
exports.getAllSongs = getAllSongs;
/* get single song by id */
const getSongById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let song;
    try {
        song = yield Songs_1.default.findById(id);
    }
    catch (error) {
        return console.log(error);
    }
    if (!song) {
        return res.status(400).json({ message: "song not found" });
    }
    return res.status(200).json({ song });
});
exports.getSongById = getSongById;
/* Delete blog */
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let song;
    try {
        song = yield Songs_1.default.findByIdAndDelete(id).populate("user");
    }
    catch (error) {
        return console.log(error);
    }
    return res.status(200).json({ message: "song deleted successfully" });
});
exports.deleteSong = deleteSong;
/* update blog */
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    let songId = req.params.id;
    let song;
    try {
        song = yield Songs_1.default.findByIdAndUpdate(songId, {
            title,
            description,
        });
    }
    catch (error) {
        return console.log(error);
    }
    if (!song) {
        return res.status(404).json({ message: "you can't update this song" });
    }
    return res.status(200).json({ song });
});
exports.updateSong = updateSong;
/* get All blogs of a user */
const getSongByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    let userSongs;
    try {
        userSongs = yield Songs_1.default.findById(userId).populate("blogs");
    }
    catch (error) {
        return console.log(error);
    }
    if (userSongs) {
        return res.status(400).json({ message: "you can't find blog by this Id" });
    }
    return res.status(200).json({ blogs: userSongs });
});
exports.getSongByUserId = getSongByUserId;
