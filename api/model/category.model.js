import mongoose from "mongoose";
const categorySchema   = new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    userRef:{
        type:String,
        required:true
    }
   
}, {timestamps:true});
const ListedCategory  = mongoose.model('ListedCategory', categorySchema);
export default ListedCategory;


    