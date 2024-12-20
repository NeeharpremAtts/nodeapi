import mongoose from 'mongoose';

const schemeaccountstatusSchema = new mongoose.Schema({
  status_name: { type: String, default: null },
  created_at: { type: Date, default: null },
  modified_at: { type: Date, default: null },
  
  created_by_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'created_by_type'
  },
  
  modified_by_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'modified_by_type'
  },
  
  created_by_type: { 
    type: String, 
    required: true, 
    enum: ['employee', 'customer', 'admin']
  },
  
  modified_by_type: { 
    type: String, 
    required: true, 
    enum: ['employee', 'customer', 'admin']
  }
},{
  timestamps:true
});

export default mongoose.model('schemeaccount_status', schemeaccountstatusSchema);
