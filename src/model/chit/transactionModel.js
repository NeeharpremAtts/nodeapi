import mongoose,{ Schema } from 'mongoose';

const transactionSchema = new Schema({
  transdetailid: {
    type: Number,
    required: true
  },
  transactionid: {
    type: String,
    required: true
  },
  typeofway: {
    type: String,
    required: true,
    enum: ['android', 'web']
  },
  payment_code: {
    type: String,
    required: true
  },
  id_customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  id_scheme_account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  id_scheme: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mobile: {
    type: String,
    default: null
  },
  id_branch: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  payment_date: {
    type: String,
    default: null
  },
  trasfer_date: {
    type: String,
    required: true
  },
  paid_installments: {
    type: Number,
    required: true
  },
  payment_amount: {
    type: Schema.Types.Decimal128, 
    default: null
  },
  gst_amount: {
    type: Schema.Types.Decimal128, 
    required: true
  },
  scheme_total: {
    type: Schema.Types.Decimal128,
    required: true
  },
  fine_amount: {
    type: Number,
    required: true
  },
  metal_weight: {
    type: Schema.Types.Decimal128,
    default: null
  },
  metal_rate: {
    type: Schema.Types.Decimal128,
    default: null
  },
  payment_mode: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  payment_status: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],//1-success,2-awaiting,3-failed,4-cancelled,5-Returned,6-Refund,7-Pending
    default: null
  },
  payment_type: {
    type: Number,
    enum: [1, 2], // 1-Offline, 2-Online
    default: 1
  },
  date_add: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_upd: {
    type: Date,
    default: null
  },
  active: {
    type: Number,
    required: true,
    enum: [1, 2], // 1-active, 2-deleted
    default: 1
  }
},{
  timestamps:true
});

export default mongoose.model('Transaction',transactionSchema)