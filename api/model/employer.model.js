import mongoose from "mongoose";
//schema for employers
const employerSchema   = new mongoose.Schema({
    usertype:{
        type:String,
        required:true,
    },
    organizationname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }

},{timestamps:true});
const Employer = mongoose.model('Employer',employerSchema);
export default Employer;