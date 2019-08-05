const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Todo", todoSchema);
