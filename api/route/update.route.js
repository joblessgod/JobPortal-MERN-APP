import express from "express";
import { updateUser } from "../controller/auth.controller.js";
import { verifyUser } from "../utils/userVerify.js";
const updateRouter = express.Router();
updateRouter.post('/update/:id',verifyUser,updateUser);
export default updateRouter;