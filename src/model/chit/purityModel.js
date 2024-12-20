import mongoose from 'mongoose';

const puritySchema = new mongoose.Schema({
    purity_name:{type:String,required:true},
    id_metal: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'Metal'},
    display_app:{type:Number,require:true,default:1},
    active: { type: Boolean, default: false },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true,ref:''}
  }, {
    timestamps: true
  });

  export default mongoose.model('purity',puritySchema);