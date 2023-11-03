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
  //for update the job
  export const updateJob= async (req,res,next)=>{
    const listing = await Listedjob.findById(req.params.id);
    if(!listing){
      return next(errorHandler(404, "Job Not Found"));
    }
    if(req.user.id === listing.userRef){
  try{
  const updatedListing = await Listedjob.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.status(200).json(updatedListing);
  }catch(error){
    next(error);
  }
    }else if(req.user.usertype === "seeker" && req.user.id !== listing.userRef){
      next(errorHandler(401,"Unauthorized Access!"))
    }else{
      next(errorHandler(401,"You can only update your own listing"))
    }
  }
  //list of jobs by id
  export const listofJobsByid= async (req,res,next)=>{
      try{
const listing  = await Listedjob.findById(req.params.id)
if(!listing){
  next(errorHandler(404,"Job Not Found!"))
}
res.status(200).json(listing);
      }catch(error){
        next(error);
      }
  }
  //delete the listing
  export const deleteListing= async(req,res,next)=>{
    const listing = await Listedjob.findById(req.params.id)
    if(!listing){
      return next(errorHandler(404,"Job is Not Found"))
    }
    if(req.user.id !== listing.userRef){
      return next(errorHandler(401,"You can only delete your listing!"))
    }
    if(req.user.usertype === "seeker"){
      return next(errorHandler(401,"Unauthorized Access!"))
    }
    try{
   await Listedjob.findByIdAndDelete(req.params.id);
   res.status(200).json("successfully deleted the job")
    }catch(error){
      next(error);
    }
  }
  //search by title
  export const searchJobResult = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const searchTerm = req.query.searchTerm || "";
  
      const sort = req.query.sort || 'createdAt'; // Default to 'createdAt'
      const order = req.query.order || 'desc'; // Default to 'desc'
  
      const jobs = await Listedjob.find({
        jobtitle: { $regex: searchTerm, $options: 'i' }
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
  
      return res.status(200).json(jobs);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  };
  
  