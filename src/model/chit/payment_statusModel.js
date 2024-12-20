import mongoose from 'mongoose';

const paymentstatusSchema = new mongoose.Schema({
    payment_status: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    remark: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('PaymentStatus', paymentstatusSchema);