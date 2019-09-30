const { checkSignedIn } = require("../utils/auth");
const Joi = require("joi");
const User = require("../models/user");
const Todo = require("../models/todo");
const { checkTodo } = require("../validators/todo");

const todo = {
  Query: {
    todos: (root, args, { req }, info) => {
      checkSignedIn(req);
      return Todo.find({});
    },
    userTodos: (root, args, { req }, info) => {
      checkSignedIn(req);
      return Todo.find({ user: req.session.userId });
    }
  },
  Mutation: {
    createTodo: async (root, args, { req }, info) => {
      checkSignedIn(req);

      await Joi.validate(args, checkTodo, { abortEarly: false });
      const { userId } = req.session;
      const todo = await Todo.create({
        description: args.description,
        user: userId,
        completed: false
      });

      await User.findOneAndUpdate({ _id: userId }, { $push: { todos: todo } });

      return todo;
    },
    updateTodo: async (root, args, { req }, info) => {
      checkSignedIn(req);
      return await Todo.findByIdAndUpdate(args.id, {
        $set: { completed: args.completed }
      });
    },
    deleteTodo: async (root, args, { req }, info) => {
      checkSignedIn(req);
      return await Todo.findByIdAndDelete(args.id);
    },
    editTodo: async (root, args, { req }, info) => {
      checkSignedIn(req);
      return await Todo.findByIdAndUpdate(args.id, {
        $set: { description: args.description }
      });
    }
  },
  Todo: {
    user: async (todo, args, { req }, info) => {
      return (await todo.populate("user").execPopulate()).user;
    }
  }
};

module.exports = todo;
