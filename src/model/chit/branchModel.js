import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
  show_to_all: {
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1, 2, 3], // 0-Own,1-All,2-All Cus Only,3-All Emp only
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    default: null,
  },
  expo_warehouse: { //associate warehouse
    type: String,
    default: null,
  },
  active: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1], // Active status: 0 - Inactive, 1 - Active
  },
  short_name: {
    type: String,
    required: true,
    default: '',
  },
  id_employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Employee'
  },
  address1: {
    type: String,
    default: null,
  },
  address2: {
    type: String,
    default: null,
  },
  id_country: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref:'Country'
  },
  id_state: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref:'State'
  },
  id_city: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref:'City'
  },
  phone: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
  },
  whatsapp_no: {
    type: String,
    required: true,
  },
  cusromercare: {
    type: String,
    default: null,
  },
  pincode: {
    type: String,
    default: null,
  },
  latt: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  metal_rate_type: {
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1, 2], // 0 - Manual , 1 - Automatic, 2 - Partial
  },
  partial_silverrate_diff: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0.00,
  },
  partial_goldrate_diff: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0.00,
  },
  logo: {
    type: String,
    required: true,
  },
  main_logo: {
    type: String,
    required: true,
  },
  favicon: {
    type: String,
    required: true,
  },
  map_url: {
    type: String,
    default: null,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('Branch', BranchSchema);