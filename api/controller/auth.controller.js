import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import Employer from "../model/employer.model.js";
import {errorHandler} from '../utils/error.js';
import  Jwt from "jsonwebtoken";
export const signup= async (req,res,next)=>{
   const{usertype,name,pjobcategory,email,phone,password,avatar} = req.body;
   const hashedPassword = bcryptjs.hashSync(password,10);
   const newUser   = new User({usertype,name,pjobcategory,email,phone,password:hashedPassword,avatar});
   try{
      await newUser.save();
      res.status(201).json({message:"user created successfully"});
   }catch(error){
      next(error);
   }
   
}
//employer register
export const esignup=async(req,res,next)=>{
   const{usertype,organizationname,email,phone,password,avatar} = req.body;
   const hashedepassword = bcryptjs.hashSync(password, 10);
   const newEmployer = new Employer({usertype,organizationname,email,phone,password:hashedepassword,avatar});
   try{
      await newEmployer.save();
      res.status(201).json({message:"Employer created successfully"})
   }catch(error){
      next(error);
   }
  
}
//LogIn
export const logIn = async (req, res, next) => {
   const {usertype,email,password} = req.body;
   if(usertype === "seeker"){
   try{
   const validUser = await User.findOne({email});
   if(!validUser){
      
      return next(errorHandler(404,"user not found!"));
   }
   const validPassword =  bcryptjs.compareSync(password,validUser.password);
   if(!validPassword){
      return next(errorHandler(402,"Wrong Credentials!"));
  }
  const token = Jwt.sign({id:validUser._id},process.env.JWT_TOKEN);
  const {password:pass,...rest} = validUser._doc
  res.cookie('acces token',token,{httpOnly:true}).status(200).json(rest);
}catch(error){
  next(error);
}
}else if(usertype === "employer"){
      try{
         const validUser = await Employer.findOne({email});
         if(!validUser){
            return next(errorHandler(404,"user not found!"));
         }
         const validPassword =  bcryptjs.compareSync(password,validUser.password);
         if(!validPassword){
            return next(errorHandler(402,"Wrong Credentials!"));
        }
        const token = Jwt.sign({id:validUser._id},process.env.JWT_TOKEN);
        const {password:pass,...rest} = validUser._doc
        res.cookie('acces token',token,{httpOnly:true}).status(200).json(rest);
      }catch(error){
        next(error);
      }
   }else{
      return next(errorHandler(404,"Please Select who the fuck are you!"))
   }
}

