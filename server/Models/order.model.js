const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Listing',
    required: true
  },
  farmerId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Farmer',
  required: true
  },
  status:{
  type: Boolean,
  default: false
  },
  type:{
  type: String,
  enum:['Spore','Stubble'],
  required: true,
  }
}, {
  timestamps: true
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;