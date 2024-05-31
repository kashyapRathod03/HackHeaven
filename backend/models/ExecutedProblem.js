const mongoose = require("mongoose");

const ExecutedProblem = mongoose.Schema({
  pId: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
//   exeutedfileID: {
//     type: String,
//     required: true,
//   },
  exeutedfilePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ExecutedProblem", ExecutedProblem);