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
    type: String,
    required: [true, 'Please enter a Phone Number']
  },
  dateOfBirth: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  adhaar:{
  type: String,
  required: true
  },
  link: 
    {
     type: String
    },
  isVerified: {
    default: true,
    type: Boolean
  },
  
}, {
  timestamps: true
});
const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;