const { UserInputError } = require("apollo-server-express");
const User = require("../models/user");
const mongoose = require("mongoose");
const Joi = require("joi");
const { signUp, signIn } = require("../validators/user");
const Auth = require("../utils/auth");

const user = {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId);
    },
    users: (root, args, { req }, info) => {
      Auth.checkSignedIn(req);
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid ID.`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      Auth.checkSignedOut(req);
      await Joi.validate(args, signUp, { abortEarly: false });
      const user = await User.create(args);
      //req.session.userId = user.id; Logs in user after sign up
      return user;
    },
    signIn: async (root, args, { req }, info) => {
      Auth.checkSignedOut(req);
      await Joi.validate(args, signIn, { abortEarly: false });
      const user = await Auth.tryToSignIn(args.email, args.password);
      req.session.userId = user.id;
      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);
      return Auth.signOut(req, res);
    }
  },
  User: {
    todos: async (user, args, context, info) => {
      return (await user.populate("todos").execPopulate()).todos;
    }
  }
};

module.exports = user;
