import mongoose from 'mongoose';

const notificationuserstatusSchema= new mongoose.Schema({
    notifyuserid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    id_notification:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'notificationuser',
        required:true
    },
    id_customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    status:{
        type:Number,
        required:true // 0-unread, 1-read
    },
    createdate:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('notificationuserstatus',notificationuserstatusSchema);