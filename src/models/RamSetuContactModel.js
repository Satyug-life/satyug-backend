const mongoose = require("mongoose");

const test = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  walletId:{
    type:String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("ram-setu-contact", test);