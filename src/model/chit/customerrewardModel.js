import mongoose from 'mongoose'

const customerrewardSchema = new mongoose.Schema({
    typeofcustomer: {
        type: Number,
        required: true,
        enum: [1, 2], // 1-Customer, 2-Employee
    },
    id_scheme_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'SchemeAccount',
        required: true
    },
    bill_no: {
        type: String,
        required: true
    },
    bill_date: {
        type: String,
        required: true
    },
    referral_to: {
        type: Number,
        required: true
    },
    referral_by: {
        type: Number,
        required: true
    },
    reference_no: {
        type: String,
        required: true
    },
    reward_amount: {
        type: Number,
        required: true
    },
    purchase_weight: {
        type: Number,
        required: true
    },
    typeway: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2] // 1-Referral Reward, 2-Purchase Reward
    },
    scheme_status: {
        type: Number,
        required: true,
        enum: [0, 1] // 0-Unpaid in Scheme, 1-Paid in Scheme
    },
    id_branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Branch'
    },
    active: {
        type: Number,
        required: true,
        default: 1
    },
    create_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: Number,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    modified_by: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('CustomerReward', customerrewardSchema)