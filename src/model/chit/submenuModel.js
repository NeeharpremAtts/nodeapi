import mongoose from "mongoose";

const submenuSchema= new mongoose.Schema({
    sumenu_name:{type:String,required:true},
    url:{typed:String,required:true},
    id_menu:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Menu'},
    active:{type:Number,required:true,default:1},
    date_add:{type:Number,requried:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,required:true,ref:''}
},{
    timestamps:true
});

export default mongoose.model('submenu',submenuSchema);