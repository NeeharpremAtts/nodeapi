import mongoose from 'mongoose';

const relationshipSchema = new mongoose.Schema({
    relationship:{type:String,required:true}
  }, {
    timestamps: true
  });

  export default mongoose.model('relationship',relationshipSchema);