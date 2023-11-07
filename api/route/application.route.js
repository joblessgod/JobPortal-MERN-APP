import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { JobApplication } from "../controller/jobapplication.controller.js";
const applicationRouter = express.Router();
applicationRouter.post("/apply/:id",verifyUser, JobApplication);
//applicationRouter.get("/applications/:jobid",verifyUser, getJobApplication);
export default applicationRouter;
