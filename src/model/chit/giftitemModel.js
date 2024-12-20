import mongoose from 'mongoose';

const giftitemSchema = new mongoose.Schema(
  {
    gift_vendorid: {
      type: Number,
      required: true
    },
    gift_name: {
      type: String,
      required: true
    },
    gift_image: {
      type: String,
      required: true
    },
    id_branch: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      default: 1 // active 1 , inactive 0
    },
    created_by: {
      type: Number,
      required: true
    },
    createdate: {
      type: Date
    },
    modify_by: {
      type: Number,
      required: true
    },
    modifydate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Giftitem', giftitemSchema);