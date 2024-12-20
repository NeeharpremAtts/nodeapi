import mongoose from "mongoose";

const closeaccbillSchema = new mongoose.Schema({
    id_scheme_account:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    refund_paymenttype:{
        type:Number,
        required:true
    },
    comments:{
        type:String
    },
    bill_no:{
        type:String,
        required:true
    },
    bill_date:{
        type:String,
        required:true
    },
    id_branch:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true
    },
    return_amount:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    closed_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }},{
        timestamps:true
    });

    export default mongoose.model('CloseAccBill',closeaccbillSchema)