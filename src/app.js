//CONFIGURAR EL CODIGO DE EXPRESS
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoute  from './routes/task.routes.js';
import cors from 'cors';




const app = express();

//CORS
const whiteList = ['http://localhost:5173','http://localhost:3000']
app.use(cors({
    //SOLO ESTE PUERTO SE PODRA COMUNICAR CON EL BACK
    origin: whiteList,
    
}));

//muestra la peticion que ha llegado (MORGAN)
app.use(morgan('dev'));

//MIDDELWARE
app.use(express.json());

//COOKIE
app.use(cookieParser());

app.use("/api",authRoutes);

//TASK
app.use("/api",taskRoute);


export default app;