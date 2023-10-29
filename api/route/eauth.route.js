import express from "express";
import  {esignup}  from "../controller/auth.controller.js";
import { listingJob } from "../controller/joblist.controller.js";
import { verifyUser } from "../utils/userVerify.js";
const eauthRouter = express.Router();
eauthRouter.post('/esignup',esignup);
eauthRouter.post('/create',verifyUser,listingJob);
export default eauthRouter;