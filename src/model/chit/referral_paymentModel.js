import mongoose, { Schema } from 'mongoose';

const referralpaymentSchema = new mongoose.Schema({
    id_referral:{type:String,required:true},
    id_employee:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Employee'},
    paid_amount:{type:Schema.Types.Decimal128,required:true},
    active:{type:Number,required:true,default:1},
    create_date:{type:Date,required:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,required:true,ref:''},
    modified_date:{type:Date,required:true},
    modified_by:{type:mongoose.Schema.Types.ObjectId,required:true,ref:''}
  }, {
    timestamps: true
  });

  export default mongoose.model('referral_payment',referralpaymentSchema);