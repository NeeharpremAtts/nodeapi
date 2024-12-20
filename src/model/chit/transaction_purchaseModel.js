import mongoose from 'mongoose';
const { Schema } = mongoose;


const transactionpurchaseSchema = new Schema({
  transactionid: {
    type: String,  
    required: true
  },
  typeofway: {
    type: String,  
    required: true
  },
  payment_code: {
    type: String,  
    required: true
  },
  id_customer: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref:'Customer'
  },
  id_product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Product'
  },
  qty: {
    type: Number,  
    required: true
  },
  id_metal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Metal'
  },
  weight: {
    type: Schema.Types.Decimal128,
    required: true
  },
  purity: {
    type: Number,  
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  mobile: {
    type: String, 
    required: true
  },
  id_branch: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref:'Branch'
  },
  total_account: {
    type: Number, 
    required: true
  },
  total_amount: {
    type: Number,
    required: true
  },
  payment_type: {
    type: Number,  
    required: true,
    enum: [1, 2]  // 1-Offline, 2- Online
  },
  payment_status: {
    type: Number, 
    required: true
  },
  payment_mode: {
    type: Number,
    required: true
  },
  trans_date: {
    type: String,
    required: true
  },
  active: {
    type: Number, 
    required: true,
    default: 1, 
    enum: [1, 2]
  }
},{
  timestamps:true
});


export default TransactionPurchase; mongoose.model('transaction_purchase', transactionpurchaseSchema);