import mongoose from 'mongoose';

const accessSchema = new mongoose.Schema({
    id_profile:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile'
    },
    id_menu:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Menu'
    },
    view:{
        type:Number,
        required:true
    },
    add:{
        type:Number,
        required:true
    },
    edit:{
        type:Number,
        required:true
    },
    delete:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model("Access",accessSchema);