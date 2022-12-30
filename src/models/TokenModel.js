const mongoose = require("mongoose");

const test = mongoose.Schema({
  walletId:{
    type:String,
    required:true
  },
  tokenType:{
    type:String,
    required:true,
    enum:['Setu', 'Karma']
  },Token:{
    type:String,
  },email:{
    type:String,
    required:true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Token", test);