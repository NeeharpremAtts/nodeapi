import mongoose from "mongoose";

const metalSchema = new mongoose.Schema({
    metal:{
        type:String,
        required:true
    },
    acitve:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('Metal',metalSchema);