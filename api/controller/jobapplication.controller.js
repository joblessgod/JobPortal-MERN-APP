import Application from "../model/jobapplication.model.js";
import { errorHandler } from "../utils/error.js";
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
//for getting a list of applicant for a job
/* export const getJobApplication=async(req,res,next)=>{
   
     if(req.user && req.user.usertype === "employer"){
        try{
            const listofapplication = await Application.find({jobid : req.params.jobid})
           
            res.status(200).json(listofapplication);
              
        }catch(error){
            next(error);
        }
    }else if(req.user && req.user.usertype === "seeker"){
      return next(errorHandler(402,"Unauthorized Access!"))
    }
} */