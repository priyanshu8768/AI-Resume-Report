import express from 'express';
import {authRouter} from './routes/auth.route.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import { interviewRouter } from './routes/interview.routes.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: (origin, callback) => {
        const frontendUrl = process.env.Frontend_URL ? process.env.Frontend_URL.replace(/\/$/, '') : null;
        const allowed = [
            frontendUrl,
            'http://localhost:5173',
        ].filter(Boolean);
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
//all routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);




export default app;