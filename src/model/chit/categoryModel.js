import mongoose from 'mongoose'

const categorySchema= new mongoose.Schema({
    id_branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
    },
    id_metal:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Metal'
    },
    id_parent:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    categoryname:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
    },
    catimage:{
        type:String,
        default:null
    },
    active:{
        type:Number,
        default:1 // 1 active, 0- inactive
    },
    date_add:{
        type:Date,
        default:Date.now()
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Employee"
    }
},{
    timestamps:true
});

export default mongoose.model('Category',categorySchema)