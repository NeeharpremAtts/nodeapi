import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id_country:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        default:1
    }
},{
    timestamps:true
})

export default mongoose.model("State",stateSchema);