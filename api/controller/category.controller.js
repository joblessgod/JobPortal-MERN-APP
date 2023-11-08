import ListedCategory from "../model/category.model.js";
import { errorHandler } from "../utils/error.js";

export const addCategory= async (req,res,next)=>{

 if (req.user && req.user.usertype === "employer") {
    try {
     const userId = req.user.id;
     const categoryname = req.body.categoryname;
      // Check if the user has already applied for the same job
      const existingCategory = await ListedCategory.findOne({ categoryname: { $regex: new RegExp(categoryname, 'i') },
      userRef: userId, });

      if (existingCategory) {
        return next(errorHandler(400, "You've already created this category."));
      }

      // If there is no existing application, create a new one
      const category = await ListedCategory.create({ ...req.body, userRef: userId });
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You are not authorized!."));
  }
};