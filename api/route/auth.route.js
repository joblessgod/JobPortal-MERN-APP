import express from "express";
import  {signup,deleteUser, signOut}  from "../controller/auth.controller.js";
import { verifyUser } from "../utils/userVerify.js";

const authRouter = express.Router();
authRouter.post('/signup',signup);
authRouter.delete('/delete/:id',verifyUser,deleteUser);
authRouter.get('/signout',signOut);


export default authRouter;
