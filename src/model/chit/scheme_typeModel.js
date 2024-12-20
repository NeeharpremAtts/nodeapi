import mongoose from 'mongoose';

const schemetypeSchema= new mongoose.Schema({
    scheme_name:{type:String,required:true},
    scheme_type:{type:mongoose.Schema.Types.ObjectId,requried:true,ref:'scheme'},
    active:{type:Number,required:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,required:true}
},{
    timestamps:true
});

export default mongoose.model('scheme_type',schemetypeSchema);