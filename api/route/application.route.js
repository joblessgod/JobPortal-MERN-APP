import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { JobApplication } from "../controller/jobapplication.controller.js";
const applicationRouter = express.Router();
applicationRouter.post("/apply",verifyUser, JobApplication);
export default applicationRouter;
