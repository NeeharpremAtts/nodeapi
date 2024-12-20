import mongoose from 'mongoose';

const staffuserSchema = new mongoose.Schema(
  {
    id_employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role_id: {
      type: String,
      required: true,
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    access_branch: {
      type: String,
    },
    active: {
      type: Number,
      default: 1,
    },
    is_deleted: {
      type: Number,
      default: 1, // 1-active, 2-inactive
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('staff_user', staffuserSchema);
