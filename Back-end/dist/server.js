"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//load environement varibale from .enf file
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
/*import Router modules here*/
const Song_routes_1 = __importDefault(require("./Routes/Song-routes"));
const User_Routes_1 = __importDefault(require("./Routes/User-Routes"));
const Album_routes_1 = __importDefault(require("./Routes/Album-routes"));
/*connect to database*/
const Dbconnect_1 = __importDefault(require("./Config/Dbconnect"));
(0, Dbconnect_1.default)();
/*Use NodeJs builtIn Middlewares here*/
const ui = process.env.UI || "http://localhost:3000";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
/*serve the static file all files in public folder will be global varibale*/
app.use("/public", express_1.default.static("public"));
/* cutom middlewares */
app.use("/Music/API/V1", Song_routes_1.default);
app.use("/Music/API/V1", User_Routes_1.default);
app.use("/Music/API/V1", Album_routes_1.default);
const port = process.env.PORT || 3000;
if (port) {
    app.listen(port, () => {
        console.log(`server is listening at port${port}`);
    });
}
exports.default = app;
