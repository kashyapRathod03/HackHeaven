const mongoose = require("mongoose");

const Problem = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("problem", Problem);