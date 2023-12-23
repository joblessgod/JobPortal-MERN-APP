import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { JobApplication,  getApplicationsForJob,  getJobsAppliedByUser } from "../controller/jobapplication.controller.js";
const applicationRouter = express.Router();
applicationRouter.post("/apply/:id",verifyUser, JobApplication);
applicationRouter.get("/getappliedbyuser/:id",verifyUser, getJobsAppliedByUser);
applicationRouter.get("/getapplicationofjob/:id",verifyUser, getApplicationsForJob);


export default applicationRouter;
