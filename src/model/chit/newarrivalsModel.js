import mongoose, { Schema } from 'mongoose';

const newarrivalsSchema = new mongoose.Schema({
    id_branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    new_arrivals_content: {
        type: String,
        required: true
    },
    date_add: {
        type: Date,
        required: true
    },
    date_update: {
        type: Date,
        required: true,
        default: null
    },
    active: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1] //  0-Inactive 1-active
    },
    new_arrivals_img_path: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    product_code: {
        type: String,
        required: true
    },
    product_weight: {
        type: Schema.Types.Decimal128,
        required: true
    },
    purity: {
        type: Number,
        default: null
    },
    product_description: {
        type: String,
        required: true
    },
    show_rate: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1] // 0- no, 1- yes
    },
    expiry_date: {
        type: Date,
        default: null
    },
    new_type: {
        type: String,
        required: true
    },
    gift_type: {
        type: String,
        required: true
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

export default mongoose.model('NewArrivals',newarrivalsSchema);