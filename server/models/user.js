const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [email => User.doesntExists({ email }), "Email already exists!"]
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

userSchema.statics.doesntExists = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
