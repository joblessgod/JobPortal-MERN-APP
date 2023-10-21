import express from "express";
import  {logIn}  from "../controller/auth.controller.js";

const logiInRouter = express.Router();

logiInRouter.post('/logIn',logIn);
export default logiInRouter;