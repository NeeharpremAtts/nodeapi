import mongoose from 'mongoose';

const schemeSchema= new mongoose.Schema({
    id_branch: { type:mongoose.Schema.Types.ObjectId, required: true,ref:'Branch'},
    payment_receipt: { type: Number, required: true },
    weekmonth: { type: Number, required: true, default: 1 },  // 1 - Month, 2 - Week
    wastagebenefit: { type: Number, required: true, default: 1 },  // 1 - Yes, 2 - No
    makingcharge: { type: Number, required: true },  // 1 - Zero Making Charge, 2 - Non Zero
    benefit_bonus: { type: Number, required: true },
    min_installments: { type: Number, required: true },
    scheme_name: { type: String, required: true, maxlength: 120 },
    code: { type: String, required: true },
    id_metal: { type: mongoose.Schema.Types.ObjectId,ref:'Metal'},
    id_purity: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'purity'},
    id_classification: { type: mongoose.Schema.Types.ObjectId,ref:'sch_classify'},
    start_accountno: {type:Number,required:true},
    scheme_type: { type: Number, default: 0 },  // 0 - Amount, 1 - Weight
    comp_installment: { type: Number, required: true, default: 0 },
    limit_installment: { type: Number, required: true },
    pending_installment: { type: Number, required: true },
    limit_customer: { type: Number, default: 0 },
    amount: { type: Number, default: null },
    total_installments: { type: Number, default: null },
    agent_percentage: { type: Number, required: true },
    gift_percentage: { type: Number, required: true },
    allow_customer: { type: Boolean, default: false },
    allow_installment: { type: Number, default: 0 },
    allow_complement: { type: Number, required: true },
    allow_collection: { type: Number, required: true },
    allow_preclose: { type: Number, required: true },
    limit_notpaid: { type: Number, required: true },
    collection_percentage: { type: Number, required: true },
    exist_collection_percentage: { type: Number, required: true },
    allow_referral: { type: Number, required: true },
    referral_percentage: { type: Number, required: true },
    min_weight: { type: Number, default: 0.000 }, 
    max_weight: { type: Number, default: 0.000 },
    description: { type: String, default: null },
    visible: { type: Boolean, default: true },
    referral_visible: { type: Number, default: 1 },
    denominationtype: { type: Number, default: 1 },  // 1 - Denomination, 2 - Non-denomination
    reward_point: { type: Number, required: true },
    convenience_fees: { type: Number, required: true },
    buy_less_rate: { type: Number, required: true },
    sell_less_rate: { type: Number, required: true },
    buy_gst: { type: Number, required: true },
    sell_gst: { type: Number, required: true },
    saving_type: { type: Number, required: true, default: 1 },
    min_fund: { type: Number, required: true },
    max_fund: { type: Number, required: true },
    active: { type: Boolean, default: false },
    date_add: { type: Date, default: null },
    date_upd: { type: Date, default: null },
    min_amount: { type: Number, required: true, default: 0 },
    max_amount: { type: Number, required: true, default: 0 },
    fine_amount: { type: Number, required: true },
    logo: { type: String, required: true },
    maturity_month: { type: Number, required: true },
    created_by: { type: Number, required: true }
  }, {
    timestamps: true
  });

  export default mongoose.model('scheme',schemeSchema)