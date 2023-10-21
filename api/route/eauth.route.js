import express from "express";
import  {esignup}  from "../controller/auth.controller.js";

const eauthRouter = express.Router();

eauthRouter.post('/esignup',esignup);
export default eauthRouter;