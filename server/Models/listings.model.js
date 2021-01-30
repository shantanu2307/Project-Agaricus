const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true
 },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref :'Seller' ,
    required: true
  },
  sellerName:{
  type: String,
  required: true
  },
  quantity:{
  type: Number,
  required: true,
  default: 0
  },
  price:{
  type: Number,
  required: true,
  },
  pics:[{
  type: String,
  data: Buffer
  }],
  details:{
      type: String,
      required: false
  }
 
}, {
  timestamps: true
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;