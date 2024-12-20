import mongoose, { Schema } from 'mongoose';

const giftinwardsSchema = new mongoose.Schema({
    gift_vendorid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    invoice_no:{
        type:String,
        required:true
    },
    id_gift:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    barcode:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    id_branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
    },
    active:{
        type:Number,
        required:true,
        default:1
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    createdate:{
        type:Date,
        required:true,
        default:null
    },
    modify_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    modifydate:{
        type:Date,
        default:null
    },
    gst_percenty:{
        type:Number,
        required:true
    },
    gst_percenty:{
        type:Schema.Types.Decimal128,
        required:true
    },
    cus_sellprice:{
        type:Schema.Types.Decimal128,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('giftinwards',giftinwardsSchema)