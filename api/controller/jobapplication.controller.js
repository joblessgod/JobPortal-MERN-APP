import Application from "../model/jobapplication.model.js";
//apply for a job
export const JobApplication= async(req,res,next)=>{
    if (req.user && req.user.usertype === "seeker") {
        try {
         const application = await Application.create(req.body);
         return res.status(200).json(application);
        } catch (error) {
          next(error);
        }
      }else{
        return next(errorHandler(401, "You Can not apply for this job!"));
      }
      
    };
