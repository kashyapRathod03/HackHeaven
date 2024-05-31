const mongoose = require("mongoose");

const UserData = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified:{
    type: Boolean,
    default: false,
  }
});

// default export
module.exports = mongoose.model("User", UserData);