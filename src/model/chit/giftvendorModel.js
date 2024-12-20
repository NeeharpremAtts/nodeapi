import mongoose from 'mongoose';

const giftvendorSchema = new mongoose.Schema({
    vendor_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    gst:{
        type:String,
        required:true
    },
    id_branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    active:{
        type:Number,
        default:1  // active 1, inactive 0
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    createdate:{
        type:Date
    },
    modify_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    modifydate:{
        type:Date
    }
},{
    timestamps:true
});

export default mongoose.model('GiftVendor',giftvendorSchema);