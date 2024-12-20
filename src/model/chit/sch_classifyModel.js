import mongoose from 'mongoose'

const schemeClassificationSchema= new mongooe.Schema({
    classification_order: {
        type: Number,
        required: true
      },
      classification_name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      term_desc: {
        type: String,
        required: true
      },
      id_branch: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
      },
      typeofscheme: {
        type: Number,
        required: true,
        enum: [1, 2], // 1: Non-Digi Gold, 2: Digi Gold
        default: 1
      },
      active: {
        type: Number,
        default:1
      },
      logo: {
        type: String,
        required: true // name of logo with extension
      },
      desc_img: {
        type: String,
        required: true
      },
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:''
      }
    },
    {
      timestamps: true
});

export default mongoose.model('sch_classify',schemeClassificationSchema);