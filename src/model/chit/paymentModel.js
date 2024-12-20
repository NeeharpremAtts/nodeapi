import mongoose, { Schema } from 'mongoose';
import { Decimal128 } from 'mongoose';

const paymentSchema = new Schema({
        payment_receipt: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        paymentcode: {
            type: String,
            required: true
        },
        id_scheme: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        id_scheme_account: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        id_transaction: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        id_customer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        id_employee: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        id_branch: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        date_payment: {
            type: Date,
            required: true
        },
        paid_installments: {
            type: Number,
            required: true //installement no
        },
        payment_type: {
            type: String,
            required: true, // 1- offline,2- online
        },
        payment_mode: {
            type: String,
            required: true
        },
        cash_amount: {
            type: Decimal128,
            required: true
        },
        card_amount: {
            type: Decimal128,
            required: true
        },
        gpay_amount: {
            type: Decimal128,
            required: true
        },
        payment_amount: {
            type: Decimal128,
            required: true
        },
        gst_amount: {
            type: Decimal128,
            required: true
        },
        fine_amount: {
            type: Decimal128,
            required: true
        },
        total_payment: {
            type: Number,
            required: true
        },
        total_amt: {
            type: Decimal128,
            required: true
        },
        bonus: {
            type: Decimal128,
            required: true
        },
        metal_rate: {
            type: String,
            default: '0.00'
        },
        metal_weight: {
            type: String,
            required: true
        },
        payment_status: {
            type: Number,
            required: true
        },
        date_upd: {
            type: String,
            required: true
        },
        remark: {
            type: String,
            default: null
        },
        itr_utr: {
            type: Number,
            default: null
        },
        date_add: {
            type: String,
            required: true
        },
        added_by: {
            type: Number,
            required: true,
            default: 0 // 0 -admin , 1- web app, 2 - mobile app
        },
        approval_date: {
            type: String,
            required: true
        },
        last_update: {
            type: Date,
            default: Date.now,
            required: true
        },
        is_offline: {
            type: Number,
            required: true,
            default: 0 //0 -online , 1 - offline
        },
        is_settled: {
            type: Number,
            required: true,
            default: 0 //1 - If payment amount settled by payu to merchant.
        },
        active: {
            type: Number,
            required: true,
            default: 1 // 1-active,2-delete
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Payments', paymentSchema);