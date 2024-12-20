import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: 1
    },
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 1
    },
    weight: {
        type: Number,
        default: null
    },
    purity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: null
    },
    size: {
        type: Number,
        default: null
    },
    metalcost: {
        type: Decimal128,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true,
        enum: [0, 1] // 0 - not sell, 1 - sell
    },
    proimage: {
        type: String,
        default: null
    },
    showprice: {
        type: Number,
        default: 1
    },
    active: {
        type: Number,
        default: 1 //1-active, 0-inactive
    },
    created_by: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

export default mongoose.model('Product', productSchema)