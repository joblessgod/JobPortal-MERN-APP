import express from "express";
import  {esignup}  from "../controller/auth.controller.js";
import {  deleteListing, listingJob, listofJobs, listofJobsByid, listofJobsforguest, searchJobResult } from "../controller/joblist.controller.js";
import { verifyUser } from "../utils/userVerify.js";

const eauthRouter = express.Router();
eauthRouter.post('/esignup',esignup);
eauthRouter.post('/create',verifyUser,listingJob);
eauthRouter.get('/view/:id',verifyUser, listofJobs); 
eauthRouter.get('/view',verifyUser, listofJobs); 
eauthRouter.get('/viewjobasguest', listofJobsforguest); 
eauthRouter.get('/viewbyid/:id', listofJobsByid); 
eauthRouter.delete('/listedjob/:id',verifyUser, deleteListing); 
eauthRouter.get('/getjobs',searchJobResult); 


export default eauthRouter;