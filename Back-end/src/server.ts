import dotenv from "dotenv";
import path from "path";
//load environement varibale from .enf file
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

/*import Router modules here*/
import songRouter from "./Routes/Song-routes";
import userRouter from "./Routes/User-Routes";
import albumRouter from "./Routes/Album-routes";

/*connect to database*/
import connectDB from "./Config/Dbconnect";
connectDB();
const app = express();
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

//server static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* cutom middlewares */
app.use("/Music/API/V1", songRouter);
app.use("/Music/API/V1", userRouter);
app.use("/Music/API/V1", albumRouter);

const port = process.env.PORT || 3000;
if (port) {
  app.listen(port, () => {
    console.log(`server is listening at port${port}`);
  });
}
export default app;
