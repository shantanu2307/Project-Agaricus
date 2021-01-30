const mongoose = require("mongoose");
const farmerSchema = new mongoose.Schema({
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
  picLinks: [
    {
     type: String
    }
  ],
  isVerified: {
    default: true,
    type: Boolean
  },
  
}, {
  timestamps: true
});
const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;