import mongoose from 'mongoose';

const schemeAccountSchema = new mongoose.Schema({
  accountschemeid: { type: Number, required: true },
  id_classification: { type: Number, required: true },
  referal_code: { type: String, required: true },
  redeemno: { type: Number, required: true },
  referal_id: { type: Number, required: true },
  collectionuserid: { type: Number, required: true },
  referralpaid: { type: Number, required: true, enum: [0, 1] }, // 0-No, 1-Yes
  id_scheme: { type: Number, default: 0 },
  closebill_id: { type: Number, required: true },
  id_customer: { type: mongoose.Schema.Types.ObjectId,ref:'Customer'},
  id_branch: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'Branch'},
  scheme_acc_number: { type: String, required: true },
  account_name: { type: String, required: true },
  amount: { type: mongoose.Decimal128, required: true },
  total_installments: { type: Number, required: true },
  min_weight: { type: mongoose.Decimal128, required: true },
  max_weight: { type: mongoose.Decimal128, required: true },
  min_amount: { type: mongoose.Decimal128, required: true },
  max_amount: { type: mongoose.Decimal128, required: true },
  last_paid_date: { type: String, required: true },
  start_date: { type: String, required: true },
  maturity_date: { type: String, required: true },
  maturity_month: { type: String, required: true },
  closed_date: { type: String, required: true },
  revert_date: { type: String, required: true },
  is_new: { type: Number, required: true, default: 1, enum: [1, 2] }, // 1-new, 2-exist
  gift_issues: { type: Number, required: true },
  email: { type: Number, required: true, enum: [0, 1] }, // 0-off, 1-On
  sms: { type: Number, required: true },
  remark_open: { type: String, required: true },
  complement: { type: Number, required: true, enum: [0, 1] }, // 0-no, 1-yes
  typeofcustomer: { type: Number, required: true },
  paymentcount: { type: Number, required: true, default: 1 },
  active: { type: Boolean, default: false },
  date_add: { type: Date, required: true },
  date_upd: { type: Date, required: true },
  added_by: { type: Number, required: true, default: 0 }, // 0 - WebApp, 1 - admin, 2 - MobileApp
  closed_by: { type: Number, required: true },
  revert_by: { type: Number, required: true },
  status: { type: Number, required: true, enum: [0, 1, 2] }, // 0-open, 1-Closed, 2-completed
  created_by: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:''}
}, {
  timestamps: true
});

export default mongoose.model('SchemeAccount', schemeAccountSchema);
