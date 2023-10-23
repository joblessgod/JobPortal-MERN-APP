import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyUser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
        return next(errorHandler(401,"You Are not authorized to do this change!"))
        
    jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
        if(err) return next(errorHandler(403,"Forbidden Request!"))
        req.user = user;
    next();
    })
}