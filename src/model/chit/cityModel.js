import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id_state:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model("City",citySchema)