const { gql } = require("apollo-server-express");

const todo = gql`
  extend type Query {
    todos: [Todo!]!
    userTodos: [Todo!]!
  }
  extend type Mutation {
    createTodo(description: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
    editTodo(id: ID!, description: String!): Todo
    deleteTodo(id: ID!): Todo
  }
  type Todo {
    id: ID!
    description: String!
    completed: Boolean
    user: User!
  }
`;

module.exports = todo;
