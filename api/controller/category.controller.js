import ListedCategory from "../model/category.model.js";
import { errorHandler } from "../utils/error.js";

export const addCategory = async (req, res, next) => {
  if (req.user && req.user.usertype === "employer") {
    try {
      const userId = req.user.id;
      const categoryname = req.body.categoryname;

      // Convert the categoryname to lowercase for case-insensitive comparison
      const lowerCaseCategoryName = categoryname.toLowerCase();

      // Check if the user has already created the same category (case-insensitive)
      const existingCategory = await ListedCategory.findOne({
        categoryname: lowerCaseCategoryName,
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message:
            "This Category is Already exist in the Database! You can use it while posting a job!",
        });
      }

      // If there is no existing category, create a new one
      const category = await ListedCategory.create({
        ...req.body,
        categoryname: lowerCaseCategoryName, // Save the lowercase categoryname
        userRef: userId,
      });

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized!",
    });
  }
};

  //fetch category from user
  export const getCategory = async (req, res, next) => {
    if (req.user && req.user.usertype === 'employer') {
      try {
        const userId = req.params.id;
  
        const categoriesWithJobCount = await ListedCategory.aggregate([
          {
            $match: { userRef: userId },
          },
          {
            $lookup: {
              from: 'listedjobs', // name of the JobList collection
              localField: 'categoryname', // field from ListedCategory collection
              foreignField: 'jobcategory', // field from JobList collection
              as: 'jobs',
            },
          },
          {
            $addFields: {
              jobCount: { $size: '$jobs' }, // count the number of jobs in each category
            },
          },
          {
            $project: {
              jobs: 0, // exclude the 'jobs' field from the final result
            },
          },
        ]);
  
        res.status(200).json(categoriesWithJobCount);
      } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
      }
    } else {
      return next(errorHandler(402, "Unauthorized Access!"));
    }
  
};
 //delete the category
 export const deleteCategory= async(req,res,next)=>{
  const listing = await ListedCategory.findById(req.params.id)
  if(!listing){
    return next(errorHandler(404,"Category is Not Found"))
  }
  if(req.user.id !== listing.userRef){
    return next(errorHandler(401,"You can only delete your categories!"))
  }
  if(req.user.usertype === "seeker"){
    return next(errorHandler(401,"Unauthorized Access!"))
  }
  try{
 await ListedCategory.findByIdAndDelete(req.params.id);
 res.status(200).json("successfully deleted the category")
  }catch(error){
    next(error);
  }
}
//fetch category detail on the basis of Id
export const listofCategoriesByid= async (req,res,next)=>{
  try{
const listing  = await ListedCategory.findById(req.params.id)
if(!listing){
next(errorHandler(404,"category Not Found!"));
}
res.status(200).json(listing);
  }catch(error){
    next(error);
  }
}
//for update the name of category
export const updateNameOfCategory = async (req, res, next) => {
  try {
    const category = await ListedCategory.findById(req.params.id);

    if (!category) {
      return next(errorHandler(404, "Category Not Found"));
    }

    if (req.user.id === category.userRef) {
      try {
      
        const { categoryname } = req.body;
      //  Convert the updated category name to lowercase for case-insensitive comparison
        const updatedCategoryLowercase = categoryname.toLowerCase();

       // Check if the user has already created the same category (case-insensitive)
       const existingCategory = await ListedCategory.findOne({
         categoryname: updatedCategoryLowercase,
         
        });

       //theres a illogical bug its not working in a certain casemust be check
  
        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message:
              "This Category is Already exist in the Database! You can use it while posting a job!",
          });
        }
        
    //Update category and get the updated document
    const updatedCategory = await ListedCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); 
       /*  res.status(200).json(updatedCategory); */ 
        res.status(200).json(updatedCategory);
      } catch (error) {
        next(error);
      }
    } else if (req.user.usertype === "seeker" && req.user.id !== category.userRef) {
      next(errorHandler(401, "Unauthorized Access!"));
    } else {
      next(errorHandler(401, "You can only update your own categories"));
    }
  } catch (error) {
    next(error);
  }
};
//fetch all category for public
export const getAllCategoryWithJobCount = async (req, res, next) => {
  try {
    const categoriesWithJobCount = await ListedCategory.aggregate([
      {
        $lookup: {
          from: 'listedjobs',
          localField: '_id',
          foreignField: 'jobcategory',
          as: 'jobs',
        },
      },
     
      {
        $addFields: {
          jobCount: { $size: '$jobs' },
        },
      },
      {
        $project: {
          jobs: 0,
        },
      },
      {
        $sort: {
          jobCount: -1,
        },
      },
    ]);
    
    
    
    res.status(200).json(categoriesWithJobCount);
    
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};