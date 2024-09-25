import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import albumRouter from './Routes/Album-routes';
import connectDB from './Config/Dbconnect';
import songRouter from './Routes/Song-routes';
import userRouter from './Routes/User-Routes';

connectDB();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/Music/API/V1', albumRouter);
app.use('/Music/API/V1', songRouter);
app.use('/Music/API/V1', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

export default app;
