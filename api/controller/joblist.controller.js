import Listedjob from "../model/joblisting.model.js";
import { errorHandler } from "../utils/error.js";

export const listingJob = async (req, res, next) => {
    if (req.user.usertype === "seeker") {
     
        return next(errorHandler(401, "You Can not post a job!"));
      }
      try {
       const listing = await Listedjob.create(req.body);
       return res.status(200).json(listing);
      } catch (error) {
        next(error);
      }
    
    
  };