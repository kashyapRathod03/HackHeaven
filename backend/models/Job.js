const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  useremail:{
    type:String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py"],
  },
  filepath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"],
  },
  input: {
    type: String,
  },
  output: {
    type: String,
  },
});

// default export
module.exports = mongoose.model("job", JobSchema);
