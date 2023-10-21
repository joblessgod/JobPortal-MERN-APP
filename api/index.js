import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eauthRouter from './route/eauth.route.js';
import authRouter from './route/auth.route.js';

import cors from 'cors'
import logiInRouter from './route/login.route.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("successfully connected to mongodb");
}).catch((error)=>{
    console.log(error);
})


app.listen(5000,()=>{
    console.log("server is running at port 5000");
});
app.use('/api/auth',authRouter);
app.use('/api/auth', eauthRouter);
app.use('/api/auth', logiInRouter);

//middleware for handle possible errors
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message  =  err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});


