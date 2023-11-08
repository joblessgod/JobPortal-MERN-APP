import express from "express";
import { verifyUser } from "../utils/userVerify.js";
import { addCategory } from "../controller/category.controller.js";
const categoryRouter = express.Router();
categoryRouter.post('/addcategory',verifyUser,addCategory);
export default categoryRouter;