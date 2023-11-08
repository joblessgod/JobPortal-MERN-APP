import Application from "../model/jobapplication.model.js";
import Listedjob from "../model/joblisting.model.js";
import { errorHandler } from "../utils/error.js";
import moment from "moment/moment.js";
//apply for a job
export const JobApplication = async (req, res, next) => {
  if (req.user && req.user.usertype === "seeker") {
    try {
      const userId = req.user.id;
      const { jobid } = req.body;

      // Check if the user has already applied for the same job
      const existingApplication = await Application.findOne({ userRef: userId, jobid });

      if (existingApplication) {
        return next(errorHandler(400, "You've already applied for this job."));
      }

      // If there is no existing application, create a new one
      const application = await Application.create({ ...req.body, userRef: userId });
      return res.status(200).json(application);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You cannot apply for this job."));
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
//get the jobs applied by a user 



export const getJobsAppliedByUser = async (req, res, next) => {
  if (req.user && req.user.usertype === "seeker") {
  try {
    // Extract the user ID from the request
    const userId = req.params.id; // Assuming you pass it as a parameter in the URL
   if(userId !== req.user.id){
    return next(errorHandler,"401 ","unauthorized Access!")
   }
    // Find all applications associated with the user ID
    const applications = await Application.find({ userRef:userId });

    // Extract the job IDs from the applications
    const jobIds = applications.map(application => application.jobid);
  // Get the current date
  const currentDate = moment().toDate();
    // Find the job details for the retrieved job IDs
    const jobs = await Listedjob.find({ _id: { $in: jobIds },  applicationdeadline: { $gte: currentDate },  });

    res.status(200).json(jobs);
    
  } catch (error) {
    next(error);
  }

}else{
  next(errorHandler(404,"User Not Found!"))
}
};

