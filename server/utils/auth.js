const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/user");
const config = require("../config");

exports.checkSignedIn = req => {
  if (!req.session.userId) {
    throw new AuthenticationError("You must be signed in.");
  }
};

exports.checkSignedOut = req => {
  if (req.session.userId) {
    throw new AuthenticationError("You are already signed in.");
  }
};

exports.tryToSignIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError("Incorrect email or password.");
  }
  if (await !user.correctPassword(password)) {
    throw new AuthenticationError("Incorrect email or password.");
  }
  return user;
};

exports.signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);
      res.clearCookie(config.session.name);
      resolve(true);
    });
  });
