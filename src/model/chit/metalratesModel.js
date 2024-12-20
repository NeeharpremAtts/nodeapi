const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Decimal128 } = mongoose.Types;

// Define the schema
const metalRatesSchema = new Schema(
  {
    id_branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    method_type: {
      type: Number,
      required: true,
      enum: [1, 2], // 1-Automatic, 2-Manual
    },
    updatetime: {
      type: Date,
      default: Date.now
    },
    add_date: {
      type: Date,
      required: false //Time of Rate added
    },
    create_date: {
      type: String,
      required: true,
      default: '0000-00-00'
    },
    id_submenu: {
      type: String,
      required: true
    },
    goldrate_22ct: {
      type: Decimal128,
      default: Decimal128.fromString("0.00")
    },
    goldrate_20ct: {
      type: Number,
      required: true,
      default: 0
    },
    goldrate_24ct: {
      type: Decimal128,
      default: Decimal128.fromString("0.00")
    },
    silverrate_1gm: {
      type: Decimal128,
      default: Decimal128.fromString("0.00")
    },
    id_employee: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    goldrate_18ct: {
      type: Decimal128,
      required: true,
      default: Decimal128.fromString("0.00")
    },
    goldcoin_1gm: {
      type: Decimal128,
      required: true,
      default: Decimal128.fromString("0.00")
    },
    platinum_1gm: {
      type: Decimal128,
      required: true,
      default: Decimal128.fromString("0.00")
    },
    diamond_1gm: {
      type: Decimal128,
      required: true,
      default: Decimal128.fromString("0.00")
    },
    rate_type: {
      type: Number,
      required: true
    },
    created_by: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      default: 1 // 1 for active, 0 for inactive
    },
    date_add: {
      type: String,
      required: true,
      default: '0000-00-00'
    },
    active: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);
