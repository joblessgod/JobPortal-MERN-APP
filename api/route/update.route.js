import express from "express";
import { updateUser } from "../controller/auth.controller.js";
import { verifyUser } from "../utils/userVerify.js";
import { updateJob } from "../controller/joblist.controller.js";
const updateRouter = express.Router();
updateRouter.post('/update/:id',verifyUser,updateUser);
updateRouter.post('/jobupdate/:id',verifyUser,updateJob);
export default updateRouter;