const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  password: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.methods.verifyPassword = function(password) {
  return compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
