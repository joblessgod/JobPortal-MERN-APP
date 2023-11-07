import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { JobApplication,  getJobsAppliedByUser } from "../controller/jobapplication.controller.js";
const applicationRouter = express.Router();
applicationRouter.post("/apply/:id",verifyUser, JobApplication);
applicationRouter.get("/getappliedbyuser/:id",verifyUser, getJobsAppliedByUser);


export default applicationRouter;
