import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  deviceid: {
    type: String,
    required: false,
  },
  subscription_id: {
    type: String,
    required: false,
  },
  iossubscription_id: {
    type: String,
    required: false,
  },
  reference_no: {
    type: String,
    required: false,
  },
  id_branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref:'Branch'
  },
  lastname: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: false,
  },
  date_of_birth: {
    type: Date,
    required: false,
  },
  date_of_wed: {
    type: Date,
    required: false,
  },
  gender: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid mobile number'],
  },
  whatsapp: {
    type: String,
    required: false,
    match: [/^\d{10}$/, 'Please enter a valid whatsapp number'],
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  pincode: {
    type: Number,
    required: true,
  },
  id_city: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref:'City'
  },
  id_state: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'State'
  },
  id_country: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Country'
  },
  nominee_name: {
    type: String,
    required: false,
  },
  nominee_relationship: {
    type: String,
    required: false,
  },
  nominee_mobile: {
    type: String,
    required: false,
  },
  cus_img: {
    type: String,
    required: false,
  },
  id_proof: {
    type: String,
    required: false,
  },
  digital_sign: {
    type: String,
    required: false,
  },
  pan: {
    type: String,
    required: false,
  },
  authorno: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  passwd: {
    type: String,
    required: false,
  },
  mpin: {
    type: String,
    required: false,
  },
  profile_complete: {
    type: Number,
    default: 0,
  },
  active: {
    type: Number,
    default: 1,
  },
  is_new: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  date_add: {
    type: Date,
    default: Date.now,
  },
  date_upd: {
    type: Date,
    default: Date.now,
  },
  added_by: {
    type: Number,
    required: true,
    enum: [0, 1, 2], 
  },
  notification: {
    type: Number,
    required: false,
    default: 0,
  },
  notifyemail: {
    type: Number,
    required: true,
    default: 1,
  },
  notifysms: {
    type: Number,
    required: true,
    default: 1,
  },
  bank_accountname: {
    type: String,
    required: false,
  },
  bank_accno: {
    type: String,
    required: false,
  },
  bank_ifsccode: {
    type: String,
    required: false,
  },
  bank_branchname: {
    type: String,
    required: false,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Employee',
  }
},{
  timestamps:true
});

export default mongoose.model('Customer', customerSchema);