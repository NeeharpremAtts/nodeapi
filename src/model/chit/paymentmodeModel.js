import mongoose from 'mongoose';

const paymentmodeSchema = new mongoose.Schema({
    mode_name: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    active: {
        type: Number,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('PaymentMode',paymentmodeSchema);