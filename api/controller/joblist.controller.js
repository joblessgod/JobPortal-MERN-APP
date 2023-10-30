import Listedjob from "../model/joblisting.model.js";
import { errorHandler } from "../utils/error.js";

export const listingJob = async (req, res, next) => {
    if (req.user && req.user.usertype === "employer") {
     
       
      
      try {
       const listing = await Listedjob.create(req.body);
       return res.status(200).json(listing);
      } catch (error) {
        next(error);
      }
    }else{
      return next(errorHandler(401, "You Can not post a job!"));
    }
    
  };
  //code for get the job from the list.
  export const listofJobs= async(req,res,next)=>{
    if(req.user && req.user.id !== req.params.id && req.user.usertype === "employer"){
      return next(errorHandler(401,"You Can only view your listed jobs!"));
    }
    if(req.user && req.user.usertype === "employer"){
      try{
    const listofjob = await Listedjob.find({userRef : req.params.id})
    res.status(200).json(listofjob);
      }catch(error){
  next(error);
      }
    }else if(req.user && req.user.usertype === "seeker" && !req.params.id){
      try{
  const listofjob = await Listedjob.find();
  res.status(200).json(listofjob);
      }catch(error){
        next(error);
      }
    }else{
      next(errorHandler(402,"Forbidden Request!"));
    }
  
  }