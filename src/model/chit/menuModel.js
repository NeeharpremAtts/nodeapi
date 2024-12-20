import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    menu_name:{
        type:String,
        required:true
    },
    icons:{
        type:String,
        required:true
    },
    active:{
        type:Number,
        required:true
    },
    display_order:{
        type:Number,
        required:true
    },
    date_add:{
        type:Number,
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    }
},{
    timestamps:true
});

export default mongoose.model('Menu',menuSchema);