import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    id_customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Customer'
    },
    type: {
        type: String,
        required: true
    },
    createdate: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Wishlist", wishlistSchema);