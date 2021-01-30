const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref :'Seller' ,
    required: true
  },
  sellerName:{
  type: String,
  required: true
  },
  state:{
    type: String,
    required: true
  },
  district:{
  type: String,
  required: true
  },
  pincode:{
  type: String,
  required: true
  },
  pics: {
  type: String,
  
  },
  certificate: {
  type: String
  },
  details:{
    type: String,
    required: false
  },
  isVerficied:{
    type: Boolean,
    default: true
  }
 
}, {
  timestamps: true
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;