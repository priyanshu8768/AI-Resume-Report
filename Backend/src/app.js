import express from 'express';
import {authRouter} from './routes/auth.route.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import { interviewRouter } from './routes/interview.routes.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: process.env.Frontend_URL,
    credentials:true
}))
//all routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);




export default app;