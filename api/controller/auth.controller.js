import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import Employer from "../model/employer.model.js";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { usertype, name, pjobcategory, email, phone, password, avatar } =
    req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    usertype,
    name,
    pjobcategory,
    email,
    phone,
    password: hashedPassword,
    avatar,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};
//employer register
export const esignup = async (req, res, next) => {
  const { usertype, organizationname, email, phone, password, avatar } =
    req.body;
  const hashedepassword = bcryptjs.hashSync(password, 10);
  const newEmployer = new Employer({
    usertype,
    organizationname,
    email,
    phone,
    password: hashedepassword,
    avatar,
  });
  try {
    await newEmployer.save();
    res.status(201).json({ message: "Employer created successfully" });
  } catch (error) {
    next(error);
  }
};
//LogIn
export const logIn = async (req, res, next) => {
  const { usertype, email, password } = req.body;
  if (usertype === "seeker") {
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, "user not found!"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(402, "Wrong Credentials!"));
      }
      const token = Jwt.sign(
        { id: validUser._id, usertype: validUser.usertype },
        process.env.JWT_TOKEN
      );
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  } else if (usertype === "employer") {
    try {
      const validUser = await Employer.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, "user not found!"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(402, "Wrong Credentials!"));
      }
      const token = Jwt.sign(
        { id: validUser._id, usertype: validUser.usertype },
        process.env.JWT_TOKEN
      );
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(404, "Please Select who the fuck are you!"));
  }
};

//update user
export const updateUser = async (req, res, next) => {
  if (req.user.usertype === "seeker") {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(401, "You are no authorized to make this change!")
      );
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updateSeeker = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            pjobcategory: req.body.pjobcategory,
            phone: req.body.phone,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updateSeeker._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  } else if (req.user.usertype === "employer") {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(401, "You are no authorized to make this change!")
      );
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updateEmployer = await Employer.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            organizationname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updateEmployer._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.usertype === "seeker") {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You Can only delete your account!"));
    }
    try {
     await User.findByIdAndDelete(req.params.id);
      res.clearCookie("access_token");
      res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
      next(error);
    }
  } else if (req.user.usertype === "employer") {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You Can only delete Your account!"));
    }
    try {
      await Employer.findByIdAndDelete(req.params.id);
      res.clearCookie("access_token");
      res.status(200).json({ message: "user Deleted SuccessFully" });
    } catch (error) {
      next(error);
    }
  }
};
//for signOut
export const signOut=async (req,res,next)=>{
  try{
    res.clearCookie("access_token");
    res.status(200).json("User Logged OUT!")
  }catch(error){
   next(error);
  }
}
