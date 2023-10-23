import express from "express";
import  {signup,deleteUser}  from "../controller/auth.controller.js";
import { verifyUser } from "../utils/userVerify.js";

const authRouter = express.Router();
authRouter.post('/signup',signup);
authRouter.delete('/delete/:id',verifyUser,deleteUser);


export default authRouter;
