import mongoose from "mongoose";

const mobileversionSchema = new mongoose.Schema({
    android_version: {
        type: String,
        required: true
    },
    android_check: {
        type: Number,
        required: true
    },
    ios_version: {
        type: String,
        required: true
    },
    ios_check: {
        type: Number,
        required: true
    },
    playstore_link: {
        type: String,
        required: true
    },
    ios_applink: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('MobileVersion', mobileversionSchema);