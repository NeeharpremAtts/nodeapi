import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    send_otptime:{
        type:Date,
        required:true
    },
    otp_code:{
        type:Number,
        required:true
    },
    type:{
        type:Number,
        requried:true,
    },
    is_verified:{
        type:Number,
        default:0
    },
    verified_time:{
        type:Date,
        default:null
    }
},{
    timestamps:true
});

export default mongoose.model('Otp',otpSchema);