import mongoose from "mongoose";

const pushnotificationSchema= new mongoose.Schema({
    noti_name:{
        type:String,
        required:true
    },
    noti_desc:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    sms:{
        type:String,
        required:true
    },
    active:{
        type:Number,
        required:true,
        default:1 // 1-active, 2-In active, 0- delete
    },
    createdata:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('PushNotfication',pushnotificationSchema);