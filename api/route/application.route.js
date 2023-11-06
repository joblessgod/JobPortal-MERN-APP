import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { JobApplication, getJobApplication } from "../controller/jobapplication.controller.js";
const applicationRouter = express.Router();
applicationRouter.post("/apply",verifyUser, JobApplication);
applicationRouter.get("/applications/:jobid",verifyUser, getJobApplication);
export default applicationRouter;
