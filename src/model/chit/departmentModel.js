import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      active: {
        type: Number,
        required: true,
        default: 1
      },
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Employee'
      }
    }, {
      timestamps: true
})

export default mongoose.model('Department',departmentSchema);