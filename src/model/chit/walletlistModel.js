import mongoose, { Schema } from 'mongoose';

const walledlistScheme = new mongoose.Schema({
    id_customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_scheme_account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credit_reward_amt: {
        type: Schema.Types.Decimal128,
        required: true
    },
    typeway: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2] // 1-Refferal,2-Purchase reward
    },
    active: {
        type: Number,
        default: 1,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('WalletList',walledlistScheme);