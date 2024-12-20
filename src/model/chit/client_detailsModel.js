import mongoose from 'mongoose';

const clientdetailsSchema= new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    pancard:{type:String,required:true},
    adhar:{type:String,required:true},
},{
    timestamps:true
});

export default mongoose.model('client_details',clientdetailsSchema);