import mongoose, { Schema } from 'mongoose';

const transactiondetailsSchema = new mongoose.Schema({
    transactionid: {
        type: String,
        required: true
    },
    typeofway:{
        type:String,
        required:true
    },
    payment_code:{
        type:String,
        required:true
    },
    id_customer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    id_branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    total_gst:{
        type:Schema.Types.Decimal128,
        required:true
    },
    total_account:{
        type:Number,
        required:true
    },
    total_amount:{
        type:Schema.Types.Decimal128,
        required:true
    },
    total_fine_amount:{
        type:Number,
        required:true
    },
    payment_type:{
        type:Number,
        required:true,
        enum:[1,2] // 1-Offline,2- online
    },
    payment_status:{
        type:Number,
        required:true
    },
    payment_mode:{
        type:Number,
        required:true
    },
    cash_amount:{
        type:Schema.Types.Decimal128,
        required:true
    },
    card_amount:{
        type:Schema.Types.Decimal128,
        required:true
    },
    gpay_amount:{
        type:Schema.Types.Decimal128,
        required:true
    },
    trans_date:{
        type:String,
        required:true
    },
    active: {
        type: Number,
        required: true,
        default: 1 // 1-active, 2-inacive
    }
}, {
    timestamps: true
});

export default mongoose.model('TransactionDetails',transactiondetailsSchema);