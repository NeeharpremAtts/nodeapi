import mongoose from "mongoose";

const profileSchema= new mongoose.Schema({
    profile_name:{
        type:String,
        required:true
    },
    active:{
        type:Number,
        required:true,
        default:1 //0-disabled, 1-enabled
    },
    date_add:{
        type:String
    }
},{
    timestamps:true
});

export default mongoose.model('Profile',profileSchema);