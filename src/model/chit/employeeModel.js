import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  reference_no: {
    type: String,
    required: true,
  },
  adhaar_card: {
    type: String,
    unique: true,
  },
  resume: {
    type: String,
    required: true,
  },
  active: {
    type: Number,
    default: 1, //1-active , 2-inactive
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid mobile number'],
  },
  phone: {
    type: String,
    required: false,
    match: [/^\d{10}$/, 'Please enter a valid phone number'],
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  id_city: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
  id_branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref:"Branch"
  },
  access_branch: {
    type: Number,
    default: 0,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  emp_code: {
    type: String,
    required: true,
    unique: true,
  },
  id_dept: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Department'
  },
  id_design: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Designation'
  },
  date_of_join: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  id_profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'profile'
  },
  is_lmx: {
    type: Boolean,
    default: false,
  },
  date_add: {
    type: Date,
    default: Date.now,
  },
  date_upd: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  is_deleted:{
    type:Number,
    default:1
  }
},{
  timestamps:true
});

export default mongoose.model('Employee', employeeSchema);