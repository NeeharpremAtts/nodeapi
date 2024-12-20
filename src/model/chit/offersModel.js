import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    id_branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    offer_content: {
        type: String,
        required: true
    },
    date_add: {
        type: Date,
        required: true
    },
    date_update: {
        type: Date,
        default: null
    },
    active: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1] // 0-inactive, 1- active
    },
    offer_img_path: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1, 2] // 0-offer, 1-banner,2-popup
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
});

export default mongoose.model('Offer',offerSchema);