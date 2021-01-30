const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
 },
  uid: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter a Phone Number']
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type:{
  type: String,
  required: true,
  enum:[Spores, Stubble]
  },
  gst:{
  type: String,
  required: true
  },
  isVerified: {
    default: true,
    type: Boolean
  },
  
}, {
  timestamps: true
});
const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;