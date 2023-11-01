import mongoose from "mongoose";
const joblistSchema   = new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    companywebsite:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    jobcategory:{
        type:String,
        required:true,
        
    },

    jobtype:{
        type:String,
        required:true,
        
    },
    joblocation:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    jobapplicationlink:{
        type:String,
        required:true
    },
    applicationdeadline:{
     type:Date,
     required:true
    },
    jobqualification:{
        type:String,
        required:true
    },
    jobdescription:{
        type:String,
        required:true
    },
    userRef:{
        type:String,
        required:true
    }
   
}, {timestamps:true});
const Listedjob  = mongoose.model('Listedjob',joblistSchema);
export default Listedjob;


    