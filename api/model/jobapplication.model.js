import mongoose from "mongoose";
//schema for employers
const jobApplicationSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
     
    },
    coverletter: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    jobid: {
      type: String,
      required: true,
     
    },
    userRef: {
      type: String,
      required: true,
      
    },
  },
  { timestamps: true }
);
const Application = mongoose.model("Application", jobApplicationSchema);
export default Application;
